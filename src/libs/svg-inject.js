/*
    svgInject - v1.0.0
    jQuery plugin for replacing img-tags with SVG content
    by Robert Bue (@robert_bue)

    Dual licensed under MIT and GPL.
 */

;(function ($, window, document, undefined) {
	var pluginName = 'svgInject'
	var injectIdx = 0

	/**
	 * Cache that helps to reduce requests
	 */
	function Cache() {
		this._entries = {}
	}

	/**
	 * Cache prototype extension for inheritance
	 * @type {Object}
	 */
	Cache.prototype = {
		/**
		 * Checks if there is already an entry with that URL
		 * @param  {String}  url
		 * @return {Boolean}
		 */
		isFileInCache: function (url) {
			return typeof this._entries[url] !== 'undefined'
		},

		/**
		 * Returns the entry of the given url if it exists. If not, false is returned;
		 * @param  {String} url
		 * @return {Object||Boolean}     Entry or false if there is no entry with that url
		 */
		getEntry: function (url) {
			return this._entries[url] || false
		},

		/**
		 * Adds an entry to the cache
		 * @param {String}   url
		 * @param {Function} callback
		 */
		addEntry: function (url, callback) {
			// check if the given callback is a function
			var isCallbackFunction = typeof callback === 'function'

			// check if the entry is already in the cache
			if (this._entries[url]) {
				// if the callback is a function and the data is loaded, we execute it instantly with the cached data
				if (isCallbackFunction && !this._entries[url].isLoading) {
					callback(this._entries[url].data)
				} else if (isCallbackFunction) {
					// if the callback is a function and the data is still loading, we push in into the callback array
					this._entries[url].callbacks.push(callback)
				}

				return this._entries[url]
			} else {
				var callbacks = []

				if (isCallbackFunction) {
					callbacks.push(callback)
				}

				// put the entry into the cache
				this._entries[url] = {
					isLoading: true,
					callbacks: callbacks,
				}
			}
		},

		/**
		 * Updates the entry after the data is loaded and executes all the callbacks for that entry
		 * @param {String} url
		 * @param {*} data
		 */
		addEntryData: function (url, data) {
			var entry = this._entries[url]

			if (typeof entry !== 'undefined') {
				entry.data = data
				entry.isLoading = false

				this.executeEntryCallbacks(url)
			}
		},

		/**
		 * Executes all callback for the entry with the given url
		 * @param  {String} url
		 */
		executeEntryCallbacks: function (url) {
			var entry = this._entries[url]

			if (typeof entry !== 'undefined') {
				for (var i = 0, j = entry.callbacks.length; i < j; i++) {
					entry.callbacks.shift()(entry.data)
					i--
					j--
				}
			}
		},
	}

	function Plugin(element, options) {
		this.element = element
		this.$element = $(element)
		this.callback = options
		this._name = pluginName
		this._cache = Plugin._cache
		this.init()
	}

	Plugin._cache = new Cache()

	Plugin.prototype = {
		init: function () {
			this.$element.css('visibility', 'hidden')
			this.injectSVG(this.$element, this.callback)
		},
		injectSVG: function ($el, callback) {
			var imgURL = $el.attr('src')
			var imgID = $el.attr('id')
			var imgClass = $el.attr('class')
			var imgData = $el.clone(true).data()
			var key = 'injectKey-' + injectIdx++
			$el.addClass(key)
			var dimensions = {
				w: $el.attr('width'),
				h: $el.attr('height'),
			}

			var _this = this

			// If the file is not in the cache, we request it
			if (!this._cache.isFileInCache(imgURL)) {
				$.get(imgURL, function (data) {
					var svg = $(data).find('svg')
					// File is put into the cache
					_this._cache.addEntryData(imgURL, svg)
				})
			}

			// We add an entry to the cache with the given image url
			this._cache.addEntry(imgURL, function (svg) {
				var $el = $('.' + key)
				// When the entry is loaded, the image gets replaces by the clone of the loaded svg
				_this.replaceIMGWithSVG($el, svg.clone(), imgID, imgClass, imgURL, imgData, dimensions, callback)
			})
		},
		replaceIMGWithSVG: function ($el, svg, imgID, imgClass, imgURL, imgData, dimensions, callback) {
			if (typeof imgID !== undefined) {
				svg = svg.attr('id', imgID)
			}

			if (typeof imgClass !== undefined) {
				var cls = svg.attr('class') !== undefined ? svg.attr('class') : ''
				svg = svg.attr('class', imgClass + ' ' + cls + ' replaced-svg')
			}

			if (typeof imgURL !== undefined) {
				svg = svg.attr('data-url', imgURL)
			}

			$.each(imgData, function (name, value) {
				svg[0].setAttribute('data-' + name, value)
			})

			svg = svg.removeAttr('xmlns:a')

			var ow = parseFloat(svg.attr('width'))
			var oh = parseFloat(svg.attr('height'))

			if (dimensions.w && dimensions.h) {
				$(svg).attr('width', dimensions.w)
				$(svg).attr('height', dimensions.h)
			} else if (dimensions.w) {
				$(svg).attr('width', dimensions.w)
				$(svg).attr('height', (oh / ow) * dimensions.w)
			} else if (dimensions.h) {
				$(svg).attr('height', dimensions.h)
				$(svg).attr('width', (ow / oh) * dimensions.h)
			}

			$el.replaceWith(svg)

			var js = new Function(svg.find('script').text())

			js()

			if (typeof callback === 'function') {
				callback()
			}
		},
	}

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options))
			}
		})
	}
})(jQuery, window, document)
