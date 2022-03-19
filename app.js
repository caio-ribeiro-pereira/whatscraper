chrome.storage.sync.clear();

document.addEventListener('DOMContentLoaded', () => {
  const outputEl = document.getElementById('output');

  chrome.runtime.sendMessage({ scrap: true });

  chrome.storage.onChanged.addListener((changed) => {
    const output = changed.output.newValue;
    if (output) {
      const result = `
        <li>
          <img src="${output.image}" alt="${output.name}">
          <aside>
            <strong>${output.name}</strong>
            <br />
            <small>${output.chatType} | ${output.phone}</small>
          </aside>
        </li>
      `;
      outputEl.innerHTML = result;
    }
  });
});