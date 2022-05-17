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

chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {message: 'open-unite'}, function (response) {
		console.info('Testing Conncetion')
		console.log(response.return)
	})
})
