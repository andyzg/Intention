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
