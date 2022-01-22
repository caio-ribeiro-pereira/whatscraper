const chatListEl = Array.from(document.querySelectorAll('#pane-side > div > div > div[role="grid"] > div'));
const output = chatListEl.map(c => {
  const imageEl = c.querySelector('div[role="row"] img');
  const titleEl = c.querySelector('div[role="row"] span[dir="auto"]');
  const name = titleEl.textContent;
  const image = imageEl.src;
  const query = new URLSearchParams(image);
  const chatData = query.get('u');
  const phone = `+${chatData.split('-')[0].split('@')[0]}`;
  const type = chatData.includes('@g.us') ? 'group' : 'user';
  return { image, name, phone, type };
});

chrome.storage.sync.set({ output });

