const incrementCounter = () => {
  const gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });

  gettingActiveTab.then(tabs => {
    try {
      const tabId = tabs[0].id;
      if (tabId) {
        browser.tabs.executeScript(tabId, { file: 'content-scripts.js' });
        browser.tabs.sendMessage(tabId, { tabId });
      }
    } catch (error) {
      console.error('unable to get the active tab', error);
    }
  });
};

incrementCounter();
