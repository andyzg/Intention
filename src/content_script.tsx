import React from 'react';
import { createRoot } from 'react-dom/client';

import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

import Toolbar from "./Components/Content/Toolbar";
import { initEvents } from './Events/keys';


chrome.runtime.onMessage.addListener(function (msg: any, sender: chrome.runtime.MessageSender, sendResponse: Function) {
  if (msg.color) {
    console.log("Hey hey ");
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});


function init() {
  const body = document.querySelector('body')
  const app = document.createElement('div')
  const store = new Store();

  app.id = 'react-root'

  console.log("RENDER!", body);
  if (body) {
    body.append(app)
  }

  const container = document.getElementById('react-root');
  const root = createRoot(container!);


  store.ready().then(() => {
    root.render(
      <Provider store={store}>
        <Toolbar />
      </Provider>
    )  // Render react component
    initEvents();
  });
}


window.addEventListener('load', init);
