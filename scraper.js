const CHAT_LIST_PATH = '#pane-side > div > div > div[role="grid"] > div';
const IMAGE_PATH = 'div[role="row"] img';
const TITLE_PATH = 'div[role="row"] span[dir="auto"]';

const chatListEl = document.querySelectorAll(CHAT_LIST_PATH);

const output = Array.from(chatListEl || []).map((c) => {
  const imageEl = c.querySelector(IMAGE_PATH);
  const titleEl = c.querySelector(TITLE_PATH);
  const name = titleEl.textContent;
  const image = imageEl.src;
  const query = new URLSearchParams(image);
  const chatData = query.get('u');
  const phone = `+${chatData.split('-')[0].split('@')[0]}`;
  const type = chatData.includes('@g.us') ? 'group' : 'user';
  return { image, name, phone, type };
});

chrome.storage.sync.set({ output });

