const setupBackground = async () => {
  console.log('setup background');
};

browser.runtime.onInstalled.addListener(setupBackground);
