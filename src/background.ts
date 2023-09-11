import * as util from './util';
import { ITask } from './types';
import store from "./store/store";
import { wrapStore } from 'webext-redux';
import { addUrlChange } from "store/reducer/session";

wrapStore(store);


chrome.runtime.onInstalled.addListener(async () => {
  // Populate the local Chrome database
  const payload: { [key: string]: ITask } = {};

  for (let i = 0; i < 10; i++) {
    const task: ITask = {
      id: util.generateId(),
      name: `Task ${i + 1}`,
      priority: i + 1,
      createdAt: Date.now(),
    }

    payload[task.id] = task;
  }

  console.log("Add payload: ", payload);
  await chrome.storage.local.clear()
  await chrome.storage.local.set({
    tasks: payload,
  })
});


chrome.storage.onChanged.addListener(() => {
  chrome.storage.local.get(null, (items) => {
    console.log("Storage on change: ", items);
  });
})


chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === 'open_side_panel' && sender.tab) {
      // This will open a tab-specific side panel only on the current tab.
      await (chrome as any).sidePanel.open({ tabId: sender.tab.id });
      await (chrome as any).sidePanel.setOptions({
        tabId: sender.tab.id,
        path: 'sidepanel.html',
        enabled: true
      });
    }
  })();
});

const storeActiveTab = async () => {
  let queryOptions = { active: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("Active tab: ", tab.url);
  store.dispatch(addUrlChange(tab.url));
};

chrome.tabs.onActivated.addListener(async (activeInfo: object) => {
  storeActiveTab();
});

chrome.tabs.onUpdated.addListener(async (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === 'complete') {
    storeActiveTab();
  }
})
