// set variables
// icon, title, type, description, shortcut
let quick_commands = [
	{
		icon: '',
		title: '',
		type: '',
		description: '',
		shortcut: '',
		action: '',
	},
]

// set quick commands
const setQuickCommands = () => {
	getActiveTab().then((response) => {
		addTabs()
	})
}

// functions
const getActiveTab = async () => {
	return await chrome.tabs.query({active: true, currentWindow: true})
}
const addTabs = async () => {
	chrome.tabs.query({}, function (tabs) {
		for (let i = 0; i < tabs.length; i++) {
			quick_commands.push({
				icon: tabs[i].favIconUrl,
				title: tabs[i].title,
				type: 'Tabs',
				description: tabs[i].url,
				shortcut: '',
				action: 'switch-tab',
			})
		}
	})
}

// inject all scripts on install
chrome.runtime.onInstalled.addListener((object) => {
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

	console.clear()
	console.group('Installation | Unite Extension')
	console.info('Unite Extension Installed')
})
// messaging
// sending
chrome.action.onClicked.addListener((tab) => {
	setQuickCommands()
	chrome.tabs.sendMessage(tab.id, {message: 'open-unite'}, function (response) {})
})
// receive
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.request) {
		case 'get-quick-commands':
			setQuickCommands()
			sendResponse(quick_commands)
			break
	}
})

// Quick Commands
// switch tab
const switchTab = (tab) => {
	chrome.tabs.highlight({
		tabs: tab.index,
		windowId: tab.windowId,
	})
	chrome.windows.update(tab.windowId, {focused: true})
}
