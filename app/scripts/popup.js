// console.log('\'Allo \'Allo! Popup')
import _ from 'lodash';
import { h, app } from 'hyperapp';
import config from './config';
require('es6-promise').polyfill();
require('isomorphic-fetch');
// This is a comment
let query = { active: true, currentWindow: false };
let currentTab;

chrome.tabs.query(query, function(tabs) {
  currentTab = tabs[0];
  chrome.runtime.sendMessage({
    type: 'getId',
    tabId: currentTab.id,
  }, (songData) => {
    app({
      state: songData,
      view: (state) => (
        <div class="app">
          <div class="container">
            <h1>{state.data[2]}</h6>
            <br />
            <div class="row">
              <div className="col-md-12">
                <div class="text-center thumbnail">
                  <img src={state.data[8]} alt="Raised Image" class="rounded img-raised" />
                  <br />
                </div>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a class="btn btn-warning btn-sm" target="_blank" href={state.data[11]}>128 kbps</a>
                  <a class="btn btn-primary btn-sm" target="_blank" href={state.data[12]}>320 kbps</a>
                  <a class="btn btn-danger btn-sm" target="_blank" href={state.data[19]}>Lossless</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    })
  })
});

