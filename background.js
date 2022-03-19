chrome.runtime.onMessage.addListener((message = {}, sender) => {
  if (message.start) {
    const WHATSAPP_URL = 'https://web.whatsapp.com';
    const TAB_QUERY = {
      active: true,
      lastFocusedWindow: true,
      currentWindow: true
    };
    chrome.tabs.query(TAB_QUERY, (tabs = []) => {
      if (!tabs[0].url.includes(WHATSAPP_URL)) {
        chrome.tabs.create({ url: WHATSAPP_URL, selected: true });
      }
    });
  }

	if (message.scrap) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['scraper.js']
    });
  }
});