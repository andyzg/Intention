import React from 'react';
import { createRoot } from 'react-dom/client';
import classes from "./content_script.module.css";

function App() {
  console.log(classes);
  return (
    <>
      <h1 className={classes.bg}>Hello World</h1>
    </>
  )
}

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

  root.render(<App/>)  // Render react component
}


window.addEventListener('load', init);
