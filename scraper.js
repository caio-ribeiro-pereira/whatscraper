function scrapData(mainEl) {
  const imageEl = mainEl.querySelector('#main > header > div > div > img');
  const nameEl = mainEl.querySelector('#main > header > div > div > div > span[dir="auto"]');
  const chatEls = mainEl.querySelectorAll('#main div[role="region"] > div');
  const messageInEl = Array.from(chatEls).find((chatEl) => chatEl.className.includes('message-in'));
  if (messageInEl) {
    const chatDataId = messageInEl.getAttribute('data-id') || '';
    const chatType = chatDataId.includes('@g.us') ? 'grupo' : 'contato';
    const isContact = chatType === 'contato';
    const phone = isContact ? `+${chatDataId.split('@')[0].replace(/[\D]+/g, '')}` : '---';
    const output = {
      chatType,
      phone,
      image: imageEl.src,
      name: nameEl.textContent
    };
    chrome.storage.sync.set({ output, loading: false });
  } else {
    chrome.storage.sync.set({ output: null, loading: false });
  }
}

function start() {
  let observer;
  const waitingMain = setInterval(() => {
    const selector = '#main';
    const app = document.querySelector(selector);
    console.log(`Procurando tag ${selector}...`);
    if (app) {
      console.log(`Observando tag ${selector}`);
      scrapData(app.parentNode);
      observer = new MutationObserver((mutations) => {
        chrome.storage.sync.set({ loading: true });
        setTimeout(() => {
          scrapData(mutations[0].target);
        }, 500);
      });
      // app.parentNode pois a div acima da #main gera id dinamico
      observer.observe(app.parentNode, { childList: true });
      clearInterval(waitingMain);
    }
  }, 1000);
}

start();