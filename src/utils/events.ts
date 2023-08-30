import hotkeys from 'hotkeys-js';


export function initEvents() {
  hotkeys("command + shift + s", function() {
    console.log("command + shift + s");
    chrome.runtime.sendMessage({ type: 'open_side_panel' });
  });
}
