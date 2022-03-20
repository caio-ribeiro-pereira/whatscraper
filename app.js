chrome.storage.sync.clear();

document.addEventListener('DOMContentLoaded', () => {
  const outputEl = document.getElementById('output');

  chrome.runtime.sendMessage({ scrap: true });

  chrome.storage.onChanged.addListener((changed) => {
    const output = changed.output.newValue;
    const loading = changed.loading.newValue;
    if (loading) {
      outputEl.innerHTML = '<h3>Carregando...</h3>';
    } else {
      if (output) {
        outputEl.innerHTML = `
          <div>
            <img src="${output.image}" alt="${output.name}">
            <aside>
              <strong>${output.name}</strong>
              <br />
              <small>${output.chatType} | ${output.phone}</small>
            </aside>
          </div>
        `;
      } else {
        outputEl.innerHTML = '<h3>Chat não identificado</h3>';
      }
    }
  });
});