// global variables
var unite_open = false

$(document).ready(() => {
	$.get(chrome.runtime.getURL('/content.html'), (data) => {
		$(data).appendTo('body')
	})

	function open_unite() {
		unite_open = true
		console.log('open_unite')
		$('#unite-extension').fadeIn()
		$('#unite-extension').removeClass('unite-hidden')
		set_command_list()
	}
	function close_unite() {
		unite_open = false
		$('#unite-extension').addClass('unite-hidden')
		$('#unite-extension').fadeOut()
	}
	function set_command_list() {
		chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
			for (let i = 0; i < response.quick_commands.length; i++) {
				let quick_command = response.quick_commands[i]
				let $unite_search_results = $('<div>', {
					'id': 'unite-search-results',
					'data-id': i,
					'data-action': quick_command.action,
				})
				let $unite_search_results_container = $('<div>', {
					id: 'unite-search-results-container',
				})
				let $unite_search_results_icon_container = $('<div>', {
					id: 'unite-search-results-icon-container',
				})

				let $unite_search_results_icon = $('<img>', {
					id: 'unite-search-results-icon',
				})

				let $unite_search_results_placeholder = $('<div>', {
					id: 'unite-search-results-placeholder',
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
				})
				let $unite_search_results_results_badge_text = $('<div>', {
					id: 'unite-search-results-results-badge-text',
					text: quick_command.type,
				})
				let $unite_search_results_details_text = $('<div>', {
					id: 'unite-search-results-details-text',
					text: quick_command.description,
				})
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
				$unite_search_results.append($unite_search_results_container)
				$('#unite-search-contents').append($unite_search_results)
			}
		})
	}
	function hover_result() {
		$(this).addClass('unite-search-results-hover')
		$(this).on('mouseout', () => {
			$(this).removeClass('unite-search-results-hover')
		})
	}
	function execute_action() {
		let action = $(this).attr('data-action')
		// find which search result was clicked
		let id = $(this).attr('data-id')
		// get the tab data of the result that was click by checking it in the quick_commands array
		chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
			// get the tab of the result that was click by checking it in the quick_commands array
			let tab = response.quick_commands[id].tab
			// send the action to the background script
			chrome.runtime.sendMessage({request: action, tab: tab})
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
})
