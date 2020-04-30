const setupBackground = async () => {
  console.log('setup background');
};

browser.runtime.onInstalled.addListener(setupBackground);

const ports = [];
let counters = {};

const connected = port => {
  const senderTabId = port.sender.tab.id;
  port.postMessage({ counter: getCounterValue(senderTabId) });

  port.onMessage.addListener(message => {
    const tabId = message.tabId;
    const currentPort = ports[tabId];
    counters = incrementCounter(tabId);
    currentPort.postMessage({ counter: getCounterValue(tabId) });
  });

  ports[senderTabId] = port;
};

const incrementCounter = tabId => ({ ...counters, [tabId]: getCounterValue(tabId) + 1 });

const getCounterValue = tabId => counters[tabId] || 0;

browser.runtime.onConnect.addListener(connected);
