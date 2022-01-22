chrome.storage.sync.clear();

chrome.runtime.sendMessage({ start: true });

document.addEventListener('DOMContentLoaded', () => {
  const scrapButtonEl = document.getElementById('scrap');
  const outputEl = document.getElementById('output');

  scrapButtonEl.addEventListener('click', () => {
    chrome.runtime.sendMessage({ scrap: true });
  });

  chrome.storage.onChanged.addListener((changed) => {
    const output = changed.output.newValue;
    if (output && output.length) {
      const result = output
        .filter(o => o.type === 'user')
        .map(o => `
          <li>
            <img src="${o.image}" alt="${o.name}">
            <aside>
              <strong>${o.name}</strong>
              <br />
              <small>${o.phone}</small>
            </aside>
          </li>
        `)
        .join('');
      outputEl.innerHTML = result;
    }
  });
});