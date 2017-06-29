const href = location.href;

chrome.runtime.sendMessage({
  type: 'setId',
  id: href.split('.')[3]
})
