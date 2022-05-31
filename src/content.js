// global variables
var unite_open = false

$(document).ready(() => {
	$.get(chrome.runtime.getURL('/content.html'), (data) => {
		$(data).appendTo('body')
	})
	function open_unite() {
		unite_open = true
		set_command_list()
		$('#unite-extension').removeClass('unite-hidden')

		$('#unite-extension #unite-search-box').focus()
		$('#unite-extension #unite-search-box').attr('autocomplete', 'off')
	}
	function close_unite() {
		unite_open = false
		$('#unite-extension').addClass('unite-hidden')
		clear_command_list()
	}
	function set_command_list() {
		chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
			for (let i = 0; i < response.quick_commands.length; i++) {
				let quick_command = response.quick_commands[i]
				let badge_class = quick_command.type.toLowerCase()
				// if it ends in s remove the s
				if (badge_class.endsWith('s')) {
					badge_class = badge_class.substring(0, badge_class.length - 1)
				}
				let $unite_search_results = $('<div>', {
					'id': 'unite-search-results',
					'data-id': i,
					'data-title': quick_command.title,
					'data-action': quick_command.action,
				})
				let $unite_search_results_container = $('<div>', {
					id: 'unite-search-results-container',
				})
				let $unite_search_results_icon_container = $('<div>', {
					id: 'unite-search-results-icon-container',
				})
				let $unite_search_results_icon
				if (quick_command.emoji) {
					$unite_search_results_icon = $('<span>', {
						id: 'unite-search-results-icon',
						text: quick_command.icon,
					})
				} else {
					$unite_search_results_icon = $('<img>', {
						id: 'unite-search-results-icon',
					})
				}
				let $unite_search_results_placeholder = $('<div>', {
					id: 'unite-search-results-placeholder',
					class: badge_class,
				})
				let $unite_search_results_text_container = $('<div>', {
					id: 'unite-search-results-text-container',
				})
				let $unite_search_results_text_main = $('<span>', {
					id: 'unite-search-results-text-main',
					text: quick_command.title,
				})
				let $unite_search_results_details_container = $('<div>', {
					id: 'unite-search-results-details-container',
				})
				let $unite_search_results_results_badge = $('<div>', {
					id: 'unite-search-results-results-badge',
					class: badge_class,
				})
				let $unite_search_results_results_badge_text = $('<div>', {
					id: 'unite-search-results-results-badge-text',
					text: quick_command.type,
				})
				let $unite_search_results_details_text = $('<div>', {
					id: 'unite-search-results-details-text',
					text: quick_command.description,
				})
				let $unite_search_results_shortcut_container = $('<div>', {
					id: 'unite-search-results-shortcut-container',
				})
				if (quick_command.shortcut) {
					quick_command.shortcut = quick_command.shortcut.replace(/\s/g, '')
					let shortcut_array = quick_command.shortcut.split('+')
					for (let j = 0; j < shortcut_array.length; j++) {
						let shortcut = shortcut_array[j]
						if (shortcut.includes('plus')) {
							shortcut = shortcut.replace('plus', '+')
							shortcut_array[j] = shortcut
						}
					}

					for (let i = 0; i < shortcut_array.length; i++) {
						let $unite_search_results_shortcut_key_container = $('<div>', {
							class: 'key-container',
						})
						let $unite_search_results_shortcut_key_badge = $('<div>', {
							class: ' key-badge',
						})
						let $unite_search_results_shortcut_key_text = $('<span>', {
							class: ' key-text',
							text: shortcut_array[i],
						})
						$unite_search_results_shortcut_key_badge.append($unite_search_results_shortcut_key_text)
						$unite_search_results_shortcut_key_container.append($unite_search_results_shortcut_key_badge)
						$unite_search_results_shortcut_container.append($unite_search_results_shortcut_key_container)
					}
				}
				if (quick_command.icon != '') {
					$unite_search_results_icon_container.append($unite_search_results_icon)
					$unite_search_results_icon.attr('src', quick_command.icon)
				} else {
					$unite_search_results_icon_container.append($unite_search_results_placeholder)
				}
				$unite_search_results_results_badge.append($unite_search_results_results_badge_text)
				$unite_search_results_details_container.append($unite_search_results_results_badge)
				$unite_search_results_details_container.append($unite_search_results_details_text)
				$unite_search_results_text_container.append($unite_search_results_details_container)
				$unite_search_results_text_container.append($unite_search_results_text_main)
				$unite_search_results_container.append($unite_search_results_icon_container)
				$unite_search_results_container.append($unite_search_results_text_container)
				//$unite_search_results_container.append($unite_search_results_shortcut_container)
				$unite_search_results.append($unite_search_results_container)
				$('#unite-search-contents').append($unite_search_results)
			}
		})
	}
	function clear_command_list() {
		$('#unite-search-contents').empty()
	}
	function hover_result() {
		$('#unite-search-contents').children().removeClass('unite-search-results-hover')

		$(this).addClass('unite-search-results-hover')
		$(this).on('mouseout', () => {
			$(this).removeClass('unite-search-results-hover')
		})
	}
	function execute_action() {
		let action = $(this).attr('data-action')
		let id = $(this).attr('data-id')
		chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
			let tab = response.quick_commands[id].tab
			chrome.runtime.sendMessage({request: action, tab: tab})
		})
		close_unite()
	}
	function search_results() {
		$('#unite-search-contents').children().removeClass('unite-search-results-hover')
		let search_text = $('#unite-search-box').val()
		$('#unite-search-contents').each(function () {
			if (search_text == '') {
				$(this).children().show()
			} else {
				let search_text_lower = search_text.toLowerCase()
				$(this)
					.children()
					.each(function () {
						let title = $(this).attr('data-title')
						let title_lower = title.toLowerCase()
						if (title_lower.includes(search_text_lower)) {
							$(this).removeClass('unite-search-results-hover')
							$(this).show()
						} else {
							$(this).hide()
							$(this).removeClass('unite-search-results-hover')
						}
					})
			}
			$(this)
				.children()
				.each(function () {
					if ($(this).css('display') != 'none') {
						$(this).addClass('unite-search-results-hover')
						return false
					}
				})
		})
	}
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch (request.message) {
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
	$(document).on('mouseover', '#unite-search-results', hover_result)
	$(document).on('click', '#unite-search-results', execute_action)
	$(document).on('input', '#unite-search-box', search_results)
	$(document).on('click', '#unite-container', function (e) {
		if (e.target.id == 'unite-container') {
			close_unite()
		}
	})
	$(document).on('keyup', function (e) {
		if (e.keyCode == 13) {
			let current_result = $('#unite-search-contents').children('.unite-search-results-hover')
			if (current_result.length > 0) {
				current_result.click()
			}
		}
		if (e.keyCode == 27) {
			close_unite()
		}
		if (e.keyCode == 38 || e.keyCode == 40) {
			let current_result = $('#unite-search-contents').children('.unite-search-results-hover')
			let current_result_index = current_result.index()
			let next_result = null
			let results = $('#unite-search-contents')

			if (e.keyCode == 38) {
				if (current_result_index > 0) {
					// next result is the nearest result above that does not have display: none
					next_result = results.children().eq(current_result_index - 1)
					while (next_result.css('display') == 'none') {
						next_result = next_result.prev()
					}
				} else {
					next_result = results.children().last()
				}
			} else {
				if (current_result_index < results.children().length - 1) {
					// next result is the nearest result below that does not have display: none
					next_result = results.children().eq(current_result_index + 1)
					while (next_result.css('display') == 'none') {
						next_result = next_result.next()
					}
				} else {
					next_result = results.children().first()
				}
			}
			if (next_result.length > 0) {
				next_result.addClass('unite-search-results-hover')
				current_result.removeClass('unite-search-results-hover')
				next_result.get(0).scrollIntoView({block: 'nearest'})
			}
		}
		if (e.keyCode == 8) {
			$('#unite-search-contents').children().removeClass('unite-search-results-hover')
			$('#unite-search-contents').children().first().addClass('unite-search-results-hover')
		}
	})
})
