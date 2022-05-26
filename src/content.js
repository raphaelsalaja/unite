// global variables
var unite_open = false

$(document).ready(() => {
	$.get(chrome.runtime.getURL('/content.html'), (data) => {
		$(data).appendTo('body')
	})
	function open_unite() {
		unite_open = true
		set_command_list()
		console.log('open_unite')
		$('#unite-extension').fadeIn()
		$('#unite-extension').removeClass('unite-hidden')
		$('#unite-extension #unite-search').focus()
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
		let id = $(this).attr('data-id')
		chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
			let tab = response.quick_commands[id].tab
			chrome.runtime.sendMessage({request: action, tab: tab})
		})
		close_unite()
	}
	function search_results() {
		let search_text = $('#unite-search-box').val()
		$('#unite-search-contents').each(function () {
			if (search_text == '') {
				$(this).show()
			} else {
				let search_text_lower = search_text.toLowerCase()
				$(this)
					.children()
					.each(function () {
						let title = $(this).attr('data-title')
						let title_lower = title.toLowerCase()
						if (title_lower.includes(search_text_lower)) {
							// add hover class to first result that is show
							$(this).show()
						} else {
							$(this).hide()
						}
					})
			}
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

	$(document).on('keydown', function (e) {
		// if any arrow key, dont scrool webpage
		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
			e.preventDefault()
		}
	})
	$(document).on('keyup', function (e) {
		// if any arrow key, dont scrool webpage

		if (e.keyCode == 38) {
			let current_result = $('#unite-search-contents').children('.unite-search-results-hover')
			if (current_result.length > 0) {
				current_result.removeClass('unite-search-results-hover')
				let prev_result = current_result.prev()
				if (prev_result.length > 0) {
					prev_result.addClass('unite-search-results-hover')
					let prev_result_top = prev_result.offset().top
					let prev_result_height = prev_result.height()
					let unite_search_contents_top = $('#unite-search-contents').offset().top
					let unite_search_contents_height = $('#unite-search-contents').height()
					let unite_search_contents_bottom = unite_search_contents_top + unite_search_contents_height
					if (prev_result_top < unite_search_contents_top) {
						let new_top = unite_search_contents_top - prev_result_top
						$('#unite-search-contents').animate({scrollTop: new_top}, 'fast')
					} else if (prev_result_top + prev_result_height > unite_search_contents_bottom) {
						let new_top = unite_search_contents_top - (prev_result_top + prev_result_height - unite_search_contents_bottom)
						$('#unite-search-contents').animate({scrollTop: new_top}, 'fast')
					}
				} else {
					$('#unite-search-contents').children().last().addClass('unite-search-results-hover')
				}
			} else {
				$('#unite-search-contents').children().last().addClass('unite-search-results-hover')
			}
		} else if (e.keyCode == 40) {
			let current_result = $('#unite-search-contents').children('.unite-search-results-hover')
			if (current_result.length > 0) {
				current_result.removeClass('unite-search-results-hover')
				let next_result = current_result.next()
				if (next_result.length > 0) {
					next_result.addClass('unite-search-results-hover')
					let next_result_top = next_result.offset().top
					let next_result_height = next_result.height()
					let unite_search_contents_top = $('#unite-search-contents').offset().top
					let unite_search_contents_height = $('#unite-search-contents').height()
					let unite_search_contents_bottom = unite_search_contents_top + unite_search_contents_height
					if (next_result_top < unite_search_contents_top) {
						let new_top = unite_search_contents_top - next_result_top
						$('#unite-search-contents').animate({scrollTop: new_top}, 'fast')
					} else if (next_result_top + next_result_height > unite_search_contents_bottom) {
						let new_top = unite_search_contents_top - (next_result_top + next_result_height - unite_search_contents_bottom)
						$('#unite-search-contents').animate({scrollTop: new_top}, 'fast')
					}
				} else {
					$('#unite-search-contents').children().first().addClass('unite-search-results-hover')
				}
			} else {
				$('#unite-search-contents').children().first().addClass('unite-search-results-hover')
			}
		} else if (e.keyCode == 13) {
			let current_result = $('#unite-search-contents').children('.unite-search-results-hover')
			if (current_result.length > 0) {
				current_result.click()
			}
		}
	})
})
