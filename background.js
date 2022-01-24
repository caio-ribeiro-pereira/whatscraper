const WHATSAPP_HOST = "web.whatsapp.com";
const WHATSAPP_URL = `https://${WHATSAPP_HOST}`;
const TAB_QUERY = {
  active: true,
  lastFocusedWindow: true,
  currentWindow: true
};

chrome.runtime.onMessage.addListener((message = {}) => {
  if (message.start) {
    chrome.tabs.query(TAB_QUERY, (tabs = []) => {
      if (!tabs[0].url.includes(WHATSAPP_URL)) {
        chrome.tabs.create({ url: WHATSAPP_URL, selected: true });
      }
    });
  }
	if (message.scrap) {
    chrome.tabs.executeScript({ file: 'scraper.js' });
  }
});