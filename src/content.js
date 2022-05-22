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
	}
	function close_unite() {
		unite_open = false
		$('#unite-extension').addClass('unite-hidden')
		$('#unite-extension').fadeOut()
	}

	// 	$('#unite-extension #logo ').attr('src', chrome.runtime.getURL('assets/layers.svg'))
	// 	$('#unite-extension #links ').attr('src', chrome.runtime.getURL('assets/mug-hot.svg'))
	// 	$('#unite-extension #settings ').attr('src', chrome.runtime.getURL('assets/settings-sliders.svg'))
	// 	$('#unite-extension #close ').attr('src', chrome.runtime.getURL('assets/cross-circle.svg'))

	// 	const topbar_ids = ['#unite-extension #logo', '#unite-extension #links', '#unite-extension #settings', '#unite-extension #close']
	// 	topbar_ids.forEach((id) => {
	// 		$(id).svgInject(function () {})
	// 	})

	// 	$('#search').selectize({
	// 		sortField: 'text',
	// 	})
	// }

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
	chrome.runtime.sendMessage({request: 'get-quick-commands'}, (response) => {
		quick_commands = response.quick_commands
	})
})

//   $('#field').autocomplete({
// 		source: countries_starting_with_A,
// 		minLength: 0,
// 		close: function (event, ui) {
// 			$input.autocomplete('widget').show()
// 		},
//   })
