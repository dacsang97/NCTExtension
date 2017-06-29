// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import _ from 'lodash';
let data = {};

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.type) {
      case 'setId':
        _.assign(data, { [sender.tab.id]: message.id })
        chrome.pageAction.show(sender.tab.id);
        break;
      case 'getId':
        sendResponse(_.get(data, message.tabId));
        break;
      default:
        console.error('Unrecognised message: ', message);
    }
  }
)

console.log('Ahihi');
