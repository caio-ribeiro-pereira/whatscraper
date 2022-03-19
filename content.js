const iframe = document.createElement('iframe');

iframe.src = chrome.runtime.getURL('app.html');
iframe.style = 'position:fixed;display:block;top:0px;right:0px;width:320px;height:100%;z-index:9999;';

document.body.append(iframe);
