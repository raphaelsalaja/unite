let quick_commands = []

const set_command_list = () => {
	get_active_tab().then((response) => {
		quick_commands = []
		quick_commands = [
			{icon: '', title: 'Open in new tab', type: 'Action', description: 'Open the current page in a new tab', shortcut: 'Ctrl + T', action: 'new-tab'},
			{icon: '', title: 'Open in new window', type: 'Action', description: 'Open the current page in a new window', shortcut: 'Ctrl + W', action: 'new-window'},
			{icon: '', title: 'Open in incognito window', type: 'Action', description: 'Open the current page in an incognito window', shortcut: 'Ctrl + Shift + W', action: 'incognito-window'},
			{icon: '', title: 'Next Tab', type: 'Action', description: 'Go to the next tab', shortcut: 'Ctrl + Tab', action: 'next-tab'},
			{icon: '', title: 'Previous Tab', type: 'Action', description: 'Go to the previous tab', shortcut: 'Ctrl + Shift + Tab', action: 'previous-tab'},
			{icon: '', title: 'Close Tab', type: 'Action', description: 'Close the current tab', shortcut: 'Ctrl + W', action: 'close-tab'},
			{icon: '', title: 'Close Window', type: 'Action', description: 'Close the current window', shortcut: 'Ctrl + Shift + W', action: 'close-window'},
			{icon: '', title: 'Add to Bookmarks', type: 'Action', description: 'Add the current page to bookmarks', shortcut: 'Ctrl + D', action: 'add-bookmark'},
			{icon: '', title: 'Clear Cache', type: 'Action', description: 'Clear the cache', shortcut: 'Ctrl + Shift + C', action: 'clear-cache'},
			{icon: '', title: 'Clear History', type: 'Action', description: 'Clear the history', shortcut: 'Ctrl + Shift + H', action: 'clear-history'},
			{icon: '', title: 'Clear Cookies', type: 'Action', description: 'Clear the cookies', shortcut: 'Ctrl + Shift + K', action: 'clear-cookies'},
			{icon: '', title: 'Clear All', type: 'Action', description: 'Clear all data', shortcut: 'Ctrl + Shift + A', action: 'clear-all'},
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
		case 'close-tab':
			chrome.tabs.getCurrent(function (tab) {
				chrome.tabs.remove(tab.id, function () {})
			})
			break
		case 'new-tab':
			chrome.tabs.create({url: 'chrome://newtab'})
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
		case 'add-bookmark':
			chrome.tabs.getCurrent(function (tab) {
				chrome.bookmarks.create({
					title: tab.title,
					url: tab.url,
				})
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
