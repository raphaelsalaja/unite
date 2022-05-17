// global variables
var unite_open = false

$(document).ready(() => {
	$.get(chrome.runtime.getURL('/content.html'), (data) => {
		$(data).appendTo('body')
	})

	function open_unite() {
		unite_open = true
		console.log('open_unite')

		$('#unite-extension').removeClass('unite-hidden')

		$(function () {
			$('#unite-extension').draggable({
				handle: '#unite-header',
				addClasses: true,
				appendTo: 'body',
				iframeFix: true,
				opacity: 0.5,
			})
		})

		$('#unite-extension #logo ').attr('src', chrome.runtime.getURL('assets/layers.svg'))
		$('#unite-extension #links ').attr('src', chrome.runtime.getURL('assets/mug-hot.svg'))
		$('#unite-extension #settings ').attr('src', chrome.runtime.getURL('assets/settings-sliders.svg'))
		$('#unite-extension #close ').attr('src', chrome.runtime.getURL('assets/cross-circle.svg'))

		const topbar_ids = ['#unite-extension #logo', '#unite-extension #links', '#unite-extension #settings', '#unite-extension #close']
		topbar_ids.forEach((id) => {
			$(id).svgInject(function () {
				// Injection complete
			})
		})
	}
	function close_unite() {
		unite_open = false
		$('#unite-extension').addClass('unite-hidden')
	}

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch (request.message) {
			case 'test-unite':
				sendResponse({return: 'Connection Successful'})
				break
			case 'open-unite':
				unite_open ? close_unite() : open_unite()
				sendResponse({return: 'unite opened'})
				break
			case 'close-unite':
				closeUnite()
				sendResponse({return: 'unite closed'})
				break
		}
		return true
	})
})
