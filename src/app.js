import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/main-reducer';

import { StylesAndScriptsApp } from "./components/component-library"; 

function GetPageData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['resources'], function(result) {
      resolve(result.resources);
    });
  });
}

async function HydrateApp() {
  var resources = await GetPageData();
  console.log(resources);
    
  const store = createStore(reducer, {
      links: resources
  });    
    
    ReactDOM.render(
        <Provider store={store}>
            <StylesAndScriptsApp />
        </Provider>
    , document.getElementById('scripts_and_styles_replacer'));
    console.log("Resource replacement app started");
}

HydrateApp();