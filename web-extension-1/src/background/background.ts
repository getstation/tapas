import { MessageContentToBackgroundI } from 'interfaces';

(() => {
  const setupBackground = async () => {
    console.log('setup background');
  };

  browser.runtime.onInstalled.addListener(setupBackground);

  let ports: { [key: number]: browser.runtime.Port } = {};
  let counters: { [key: number]: number } = {};

  const getCounterValue = (tabId: number) => counters[tabId] || 0;
  const incrementCounter = (tabId: number) => ({ ...counters, [tabId]: getCounterValue(tabId) + 1 });

  const connected = (port: browser.runtime.Port) => {
    const senderTabId = port.sender?.tab?.id;

    if (!senderTabId) {
      throw new Error('Tab id is missing in sender');
    }

    port.postMessage({ counter: getCounterValue(senderTabId) });

    port.onMessage.addListener(({ tabId }: MessageContentToBackgroundI) => {
      const currentPort = ports[tabId];
      counters = incrementCounter(tabId);
      currentPort.postMessage({ counter: getCounterValue(tabId) });
    });

    ports = { ...ports, [senderTabId]: port };
  };

  browser.runtime.onConnect.addListener(connected);
})();
