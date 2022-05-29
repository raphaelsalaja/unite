let quick_commands = []
const set_command_list = () => {
	get_active_tab().then((response) => {
		quick_commands = []
		quick_commands = [
			{emoji: true, icon: '🚀', title: 'Open in new tab', type: 'Action', description: 'Open the current page in a new tab', shortcut: 'Ctrl + T', action: 'new-tab'},
			{emoji: true, icon: '🚀', title: 'Open in new window', type: 'Action', description: 'Open the current page in a new window', shortcut: 'Ctrl + W', action: 'new-window'},
			{emoji: true, icon: '🤫', title: 'Open in incognito window', type: 'Action', description: 'Open the current page in an incognito window', shortcut: 'Ctrl + Shift + W', action: 'incognito-window'},
			{emoji: true, icon: '➡️', title: 'Next Tab', type: 'Action', description: 'Go to the next tab', shortcut: 'Ctrl + Tab', action: 'next-tab'},
			{emoji: true, icon: '⬅️', title: 'Previous Tab', type: 'Action', description: 'Go to the previous tab', shortcut: 'Ctrl + Shift + Tab', action: 'previous-tab'},
			{emoji: true, icon: '🗡️', title: 'Close Tab', type: 'Action', description: 'Close the current tab', shortcut: 'Ctrl + W', action: 'close-tab'},
			{emoji: true, icon: '🗡️', title: 'Close Window', type: 'Action', description: 'Close the current window', shortcut: 'Ctrl + Shift + W', action: 'close-window'},
			{emoji: true, icon: '🧹', title: 'Clear Cache', type: 'Action', description: 'Clear the cache', shortcut: 'Ctrl + Shift + C', action: 'clear-cache'},
			{emoji: true, icon: '🧹', title: 'Clear History', type: 'Action', description: 'Clear the history', shortcut: 'Ctrl + Shift + H', action: 'clear-history'},
			{emoji: true, icon: '🧹', title: 'Clear Cookies', type: 'Action', description: 'Clear the cookies', shortcut: 'Ctrl + Shift + K', action: 'clear-cookies'},
			{emoji: true, icon: '🧹', title: 'Clear All', type: 'Action', description: 'Clear all data', shortcut: 'Ctrl + Shift + A', action: 'clear-all'},
			{emoji: true, icon: '🔓', title: 'Open Settings', type: 'Action', description: 'Open the settings page', shortcut: 'Ctrl + Shift + S', action: 'open-settings'},
			{emoji: true, icon: '📂', title: 'Open Downloads', type: 'Action', description: 'Open the downloads page', shortcut: 'Ctrl + Shift + D', action: 'open-downloads'},
			{emoji: true, icon: '📖', title: 'Open Bookmarks', type: 'Action', description: 'Open the bookmarks page', shortcut: 'Ctrl + Shift + B', action: 'open-bookmarks'},
			{emoji: true, icon: '📜', title: 'Open History', type: 'Action', description: 'Open the history page', shortcut: 'Ctrl + Shift + H', action: 'open-history'},
			{emoji: true, icon: '📂', title: 'Open Extensions', type: 'Action', description: 'Open the extensions page', shortcut: 'Ctrl + Shift + E', action: 'open-extensions'},
			{emoji: true, icon: '🔃', title: 'Reload', type: 'Action', description: 'Reload the current page', shortcut: 'Ctrl + R', action: 'reload'},
			{emoji: true, icon: '🔃', title: 'Reload All', type: 'Action', description: 'Reload all the tabs', shortcut: 'Ctrl + Shift + R', action: 'reload-all'},
			{emoji: true, icon: '🔍', title: 'Zoom In', type: 'Action', description: 'Zoom in', shortcut: 'Ctrl + plus', action: 'zoom-in'},
			{emoji: true, icon: '🔍', title: 'Zoom Out', type: 'Action', description: 'Zoom out', shortcut: 'Ctrl + -', action: 'zoom-out'},
			{emoji: true, icon: '🔍', title: 'Zoom Reset', type: 'Action', description: 'Reset zoom', shortcut: 'Ctrl + 0', action: 'zoom-reset'},
			{emoji: true, icon: '📌', title: 'Pin Tab', type: 'Action', description: 'Pin/Unpin the current tab', shortcut: 'Ctrl + Shift + P', action: 'pin-tab'},
			{emoji: true, icon: '📌', title: 'Pin All Tabs', type: 'Action', description: 'Pin/Unpin all tabs', shortcut: 'Ctrl + Shift + P', action: 'pin-all-tabs'},
			{emoji: true, icon: '🔇', title: 'Mute Tab', type: 'Action', description: 'Mute/Unmute the current tab', shortcut: 'Ctrl + Shift + M', action: 'mute-tab'},
			{emoji: true, icon: '🔇', title: 'Mute All', type: 'Action', description: 'Mute/Unmute all the tabs', shortcut: 'Ctrl + Shift + Shift + M', action: 'mute-all'},
			{emoji: true, icon: '📈', title: 'Open Calculator', type: 'Tools', description: 'Open the calculator', shortcut: 'Ctrl + Shift + C', action: 'open-calculator'},
			{emoji: true, icon: '🕰', title: 'Open Clock', type: 'Tools', description: 'Open the clock', shortcut: 'Ctrl + Shift + K', action: 'open-clock'},
			{emoji: true, icon: '📅', title: 'Open Calendar', type: 'Tools', description: 'Open the calendar', shortcut: 'Ctrl + Shift + K', action: 'open-calendar'},
			{emoji: true, icon: '🌡️', title: 'Open Weather', type: 'Tools', description: 'Get the weather', shortcut: 'Ctrl + Shift + W', action: 'weather'},
			{emoji: true, icon: '📧', title: 'Open Gmail', type: 'Quicklinks', description: 'Open Gmail', shortcut: 'Ctrl + Shift + G', action: 'open-gmail'},
			{emoji: true, icon: '📰', title: 'Open News', type: 'Quicklinks', description: 'Get the news', shortcut: 'Ctrl + Shift + N', action: 'news'},
			{emoji: true, icon: '🗂️', title: 'Open Drive', type: 'Quicklinks', description: 'Open Drive', shortcut: 'Ctrl + Shift + D', action: 'open-drive'},
			{emoji: true, icon: '📚', title: 'Open Docs', type: 'Quicklinks', description: 'Open Docs', shortcut: 'Ctrl + Shift + O', action: 'open-docs'},
			{emoji: true, icon: '📋', title: 'Open Sheets', type: 'Quicklinks', description: 'Open Sheets', shortcut: 'Ctrl + Shift + S', action: 'open-sheets'},
			{emoji: true, icon: '📊', title: 'Open Slides', type: 'Quicklinks', description: 'Open Slides', shortcut: 'Ctrl + Shift + L', action: 'open-slides'},
			{emoji: true, icon: '🗺️', title: 'Open Maps', type: 'Quicklinks', description: 'Open Maps', shortcut: 'Ctrl + Shift + M', action: 'open-maps'},
			{emoji: true, icon: '📺', title: 'Open YouTube', type: 'Quicklinks', description: 'Open YouTube', shortcut: 'Ctrl + Shift + Y', action: 'open-youtube'},
			{emoji: true, icon: '📱', title: 'Open Facebook', type: 'Quicklinks', description: 'Open Facebook', shortcut: 'Ctrl + Shift + F', action: 'open-facebook'},
			{emoji: true, icon: '🐦', title: 'Open Twitter', type: 'Quicklinks', description: 'Open Twitter', shortcut: 'Ctrl + Shift + T', action: 'open-twitter'},
			{emoji: true, icon: '📷', title: 'Open Instagram', type: 'Quicklinks', description: 'Open Instagram', shortcut: 'Ctrl + Shift + I', action: 'open-instagram'},
			{emoji: true, icon: '📧', title: 'Open LinkedIn', type: 'Quicklinks', description: 'Open LinkedIn', shortcut: 'Ctrl + Shift + L', action: 'open-linkedin'},
			{emoji: true, icon: '📌', title: 'Open Pinterest', type: 'Quicklinks', description: 'Open Pinterest', shortcut: 'Ctrl + Shift + P', action: 'open-pinterest'},
			{emoji: true, icon: '📰', title: 'Open Reddit', type: 'Quicklinks', description: 'Open Reddit', shortcut: 'Ctrl + Shift + R', action: 'open-reddit'},
			{emoji: true, icon: '📷', title: 'Open Flickr', type: 'Quicklinks', description: 'Open Flickr', shortcut: 'Ctrl + Shift + F', action: 'open-flickr'},
			{emoji: true, icon: '📌', title: 'Open Foursquare', type: 'Quicklinks', description: 'Open Foursquare', shortcut: 'Ctrl + Shift + Q', action: 'open-foursquare'},
			{emoji: true, icon: '📷', title: 'Open Imgur', type: 'Quicklinks', description: 'Open Imgur', shortcut: 'Ctrl + Shift + I', action: 'open-imgur'},
			{emoji: true, icon: '📰', title: 'Open Quora', type: 'Quicklinks', description: 'Open Quora', shortcut: 'Ctrl + Shift + Q', action: 'open-quora'},
			{emoji: true, icon: '📰', title: 'Open Stackoverflow', type: 'Quicklinks', description: 'Open Stackoverflow', shortcut: 'Ctrl + Shift + S', action: 'open-stackoverflow'},
			{emoji: true, icon: '📦', title: 'Open GitHub', type: 'Quicklinks', description: 'Open GitHub', shortcut: 'Ctrl + Shift + G', action: 'open-github'},
			{emoji: true, icon: '💵', title: 'Buy me a coffee', type: 'Support', description: 'Buy me a coffee', shortcut: 'Ctrl + Shift + B', action: 'buy-me-a-coffee'},
			{emoji: true, icon: '🔗', title: 'Link to my Linktree', type: 'Support', description: 'Link to my Linktree', shortcut: 'Ctrl + Shift + L', action: 'link-to-my-linktree'},
		]
		get_tabs()
	})
}
const get_tabs = () => {
	chrome.tabs.query({}, function (tabs) {
		for (let i = 0; i < tabs.length; i++) {
			let url = tabs[i].url
			url = url.substring(0, url.lastIndexOf('/'))
			quick_commands.push({
				icon: tabs[i].favIconUrl,
				title: tabs[i].title,
				type: 'Tabs',
				description: url,
				shortcut: '',
				action: 'switch-tab',
				tab: tabs[i],
			})
		}
	})
}
const get_active_tab = async () => {
	return await chrome.tabs.query({active: true, currentWindow: true})
}
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {message: 'open-unite'}, function (response) {})
})
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.request) {
		case 'get-quick-commands':
			sendResponse({quick_commands: quick_commands})
			break
		case 'switch-tab':
			// defocus from current tab and focus on new tab
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.update(tabs[0].id, {active: false})
				chrome.tabs.update(message.tab.id, {active: true})
			})

			break
		case 'new-tab':
			chrome.tabs.create({url: 'chrome://newtab'})
			break
		case 'close-tab':
			chrome.tabs.getCurrent(function (tab) {
				chrome.tabs.remove(tab.id, function () {})
			})
			break
		case 'new-window':
			chrome.windows.create({url: 'chrome://newtab'})
			break
		case 'incognito-window':
			chrome.windows.create({url: 'chrome://newtab', incognito: true})
			break
		case 'next-tab':
			chrome.tabs.query({currentWindow: true}, function (tabs) {
				var index = tabs.findIndex(function (tab) {
					return tab.active
				})
				chrome.tabs.update(tabs[(index + 1) % tabs.length].id, {active: true})
			})
			break
		case 'previous-tab':
			chrome.tabs.query({currentWindow: true}, function (tabs) {
				var index = tabs.findIndex(function (tab) {
					return tab.active
				})
				chrome.tabs.update(tabs[(index - 1 + tabs.length) % tabs.length].id, {active: true})
			})
			break
		case 'close-window':
			chrome.windows.getCurrent(function (window) {
				chrome.windows.remove(window.id, function () {})
			})
			break
		case 'clear-cache':
			chrome.browsingData.remove(
				{
					since: 0,
				},
				{
					appcache: true,
					cache: true,
					cacheStorage: true,
					cookies: true,
					downloads: true,
					fileSystems: true,
					formData: true,
					history: true,
					indexedDB: true,
					localStorage: true,
					pluginData: true,
					passwords: true,
					webSQL: true,
				},
				function () {}
			)
			break
		case 'clear-history':
			chrome.browsingData.remove(
				{
					since: 0,
				},
				{
					appcache: true,
					cache: true,
					cacheStorage: true,
					cookies: true,
					downloads: true,
					fileSystems: true,
					formData: true,
					history: true,
					indexedDB: true,
					localStorage: true,
					pluginData: true,
					passwords: true,
					webSQL: true,
				},
				function () {}
			)
			break
		case 'clear-cookies':
			chrome.browsingData.remove(
				{
					since: 0,
				},
				{
					appcache: true,
					cache: true,
					cacheStorage: true,
					cookies: true,
					downloads: true,
					fileSystems: true,
					formData: true,
					history: true,
					indexedDB: true,
					localStorage: true,
					pluginData: true,
					passwords: true,
					webSQL: true,
				},
				function () {}
			)
			break
		case 'clear-all':
			chrome.browsingData.remove(
				{
					since: 0,
				},
				{
					appcache: true,
					cache: true,
					cacheStorage: true,
					cookies: true,
					downloads: true,
					fileSystems: true,
					formData: true,
					history: true,
					indexedDB: true,
					localStorage: true,
					pluginData: true,
					passwords: true,
					webSQL: true,
					serviceWorkers: true,
					cacheStorage: true,
					appcache: true,
				},
				function () {}
			)
			break
		case 'open-settings':
			chrome.runtime.openOptionsPage()
			break
		case 'open-dowloands':
			chrome.downloads.showDefaultFolder()
			break
		case 'open-bookmarks':
			chrome.bookmarks.openTree()
			break
		case 'open-history':
			chrome.history.openEntry()
			break
		case 'open-extensions':
			chrome.management.openExtensions()
			break
		case 'reload':
			chrome.tabs.reload()
			break
		case 'reload-all':
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.tabs.reload(tab.id)
				})
			})
			break
		case 'zoom-in':
			chrome.tabs.getZoom(function (zoom) {
				chrome.tabs.setZoom(zoom + 0.1)
			})
			break
		case 'zoom-out':
			chrome.tabs.getZoom(function (zoom) {
				chrome.tabs.setZoom(zoom - 0.1)
			})
			break
		case 'zoom-reset':
			chrome.tabs.getZoom(function (zoom) {
				chrome.tabs.setZoom(1)
			})
			break
		case 'pin-tab':
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.update(tabs[0].id, {pinned: !tabs[0].pinned})
			})
			break
		case 'pin-all':
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.tabs.update(tab.id, {pinned: !tab.pinned})
				})
			})
			break
		case 'mute-tab':
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.update(tabs[0].id, {muted: !tabs[0].mutedInfo.muted})
			})
			break
		case 'mute-all':
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted})
				})
			})
			break
		case 'open-calculator':
			chrome.tabs.create({url: 'https://www.google.com/search?q=calculator'})
			break
		case 'open-clock':
			chrome.tabs.create({url: 'https://www.google.com/search?q=clock'})
			break
		case 'open-calendar':
			chrome.tabs.create({url: 'https://www.google.com/search?q=calendar'})
			break
		case 'open-weather':
			chrome.tabs.create({url: 'https://www.google.com/search?q=weather'})
			break
		case 'open-gmail':
			chrome.tabs.create({url: 'https://mail.google.com/'})
			break
		case 'open-drive':
			chrome.tabs.create({url: 'https://drive.google.com/'})
			break
		case 'open-docs':
			chrome.tabs.create({url: 'https://docs.google.com/'})
			break
		case 'open-sheets':
			chrome.tabs.create({url: 'https://sheets.google.com/'})
			break
		case 'open-slides':
			chrome.tabs.create({url: 'https://slides.google.com/'})
			break
		case 'open-maps':
			chrome.tabs.create({url: 'https://www.google.com/maps/'})
			break
		case 'open-gmail':
			chrome.tabs.create({url: 'https://mail.google.com/'})
			break
		case 'open-drive':
			chrome.tabs.create({url: 'https://drive.google.com/'})
			break
		case 'open-docs':
			chrome.tabs.create({url: 'https://docs.google.com/'})
			break
		case 'open-youtube':
			chrome.tabs.create({url: 'https://www.youtube.com/'})
			break
		case 'open-facebook':
			chrome.tabs.create({url: 'https://www.facebook.com/'})
			break
		case 'open-twitter':
			chrome.tabs.create({url: 'https://twitter.com/'})
			break
		case 'open-instagram':
			chrome.tabs.create({url: 'https://www.instagram.com/'})
			break
		case 'open-linkedin':
			chrome.tabs.create({url: 'https://www.linkedin.com/'})
			break
		case 'open-pinterest':
			chrome.tabs.create({url: 'https://www.pinterest.com/'})
			break
		case 'open-reddit':
			chrome.tabs.create({url: 'https://www.reddit.com/'})
			break
		case 'open-flickr':
			chrome.tabs.create({url: 'https://www.flickr.com/'})
			break
		case 'open-foursquare':
			chrome.tabs.create({url: 'https://foursquare.com/'})
			break
		case 'open-imgur':
			chrome.tabs.create({url: 'https://imgur.com/'})
			break
		case 'buy-me-a-coffee':
			chrome.tabs.create({url: 'https://www.buymeacoffee.com/'})
			break
		case 'link-to-my-linktree':
			chrome.tabs.create({url: 'https://linktree.io/'})
	}
})
chrome.runtime.onInstalled.addListener((object) => {
	console.clear()
	set_command_list()

	const injectScripts = (tab) => {
		const manifest = chrome.runtime.getManifest()
		const scripts = manifest.content_scripts[0].js
		const scripts_length = scripts.length

		for (let i = 0; i < scripts_length; i++) {
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				files: [scripts[i]],
			})
		}

		chrome.scripting.insertCSS({
			target: {tabId: tab.id},
			files: [manifest.content_scripts[0].css[0]],
		})
	}

	chrome.windows.getAll(
		{
			populate: true,
		},
		(windows) => {
			let currentWindow
			const w = windows.length

			for (let i = 0; i < w; i++) {
				currentWindow = windows[i]

				let currentTab
				const t = currentWindow.tabs.length

				for (let j = 0; j < t; j++) {
					currentTab = currentWindow.tabs[j]
					if (!currentTab.url.includes('chrome://') && !currentTab.url.includes('chrome-extension://') && !currentTab.url.includes('chrome.google.com')) {
						injectScripts(currentTab)
					}
				}
			}
		}
	)
})
chrome.commands.onCommand.addListener((command) => {
	if (command == 'open-unite') {
		console.log(response.url)
		get_active_tab().then((response) => {
			if (!response.url.includes('chrome://') && !response.url.includes('chrome.google.com')) {
				console.log(response.url)
				chrome.tabs.sendMessage(response.id, {request: 'open-unite'}, function (response) {})
			}
		})
	}
})
chrome.tabs.onCreated.addListener((tab) => set_command_list())
chrome.tabs.onRemoved.addListener((tabId, changeInfo) => set_command_list())
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => set_command_list())
