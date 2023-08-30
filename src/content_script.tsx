import React from 'react';
import { createRoot } from 'react-dom/client';
import Toolbar from "./Components/Content/Toolbar";

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

  app.id = 'react-root'

  console.log("RENDER!");
  if (body) {
    body.prepend(app)
  }

  const container = document.getElementById('react-root');
  const root = createRoot(container!);

  root.render(<Toolbar />)  // Render react component
}


window.addEventListener('load', init);
