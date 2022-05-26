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
			{emoji: true, icon: '🔍', title: 'Zoom In', type: 'Action', description: 'Zoom in', shortcut: 'Ctrl + +', action: 'zoom-in'},
			{emoji: true, icon: '🔍', title: 'Zoom Out', type: 'Action', description: 'Zoom out', shortcut: 'Ctrl + -', action: 'zoom-out'},
			{emoji: true, icon: '🔍', title: 'Zoom Reset', type: 'Action', description: 'Reset zoom', shortcut: 'Ctrl + 0', action: 'zoom-reset'},
			{emoji: true, icon: '📌', title: 'Pin Tab', type: 'Action', description: 'Pin/Unpin the current tab', shortcut: 'Ctrl + Shift + P', action: 'pin-tab'},
			{emoji: true, icon: '📌', title: 'Pin All Tabs', type: 'Action', description: 'Pin/Unpin all tabs', shortcut: 'Ctrl + Shift + P', action: 'pin-all-tabs'},
			{emoji: true, icon: '🔇', title: 'Mute Tab', type: 'Action', description: 'Mute/Unmute the current tab', shortcut: 'Ctrl + Shift + M', action: 'mute-tab'},
			{emoji: true, icon: '🔇', title: 'Mute All', type: 'Action', description: 'Mute/Unmute all the tabs', shortcut: 'Ctrl + Shift + Shift + M', action: 'mute-all'},
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
			set_command_list()
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
			//if unpinned, pin, else unpin
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
	}
})
chrome.runtime.onInstalled.addListener((object) => {
	// clear console log
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
