// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import _ from 'lodash';
import config from './config';
let data = {};

fetch(`${config.BASE_URL}/${config.TOKEN_URL}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
    body: config.TOKEN_DATA
  })
  .then(function (response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json()
  })
  .then(function (responseData) {
    localStorage.setItem('token', responseData.data.accessToken);
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
      case 'setId':
        const accessToken = localStorage.getItem('token');
        fetch(`${config.BASE_URL}/songs/${message.id}?access_token=${accessToken}`)
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
            _.assign(data, {
              [sender.tab.id]: {
                id: message.id,
                data: responseData.data,
              }
            });
            chrome.pageAction.show(sender.tab.id);
          });
        break;
      case 'getId':
        sendResponse(_.get(data, message.tabId));
        break;
      default:
        console.error('Unrecognised message: ', message);
    }
  })

console.log('Ahihi');
