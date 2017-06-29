// console.log('\'Allo \'Allo! Popup')
import _ from 'lodash';

let query = { active: true, currentWindow: true };
let currentTab;

chrome.tabs.query(query, function(tabs) {
  currentTab = tabs[0];
  chrome.runtime.sendMessage({
    type: 'getId',
    tabId: currentTab.id,
  }, (songId) => {
    console.log(songId)
  })
});

