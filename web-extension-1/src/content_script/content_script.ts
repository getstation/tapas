import { MessageContentToBackgroundI, MessageBackgroundToContentI, MessagePopupToContentI } from 'interfaces';

(() => {
  const port = browser.runtime.connect(browser.runtime.id, { name: 'content_script/lifecycle' });

  const removeEverything = () => {
    while (document.body.firstChild) {
      document.body.firstChild.remove();
    }
  };

  const insertCounter = (counter: number) => {
    removeEverything();
    const counterElement = document.createTextNode(`Popup opened ${counter} times on this tab`);
    document.body.appendChild(counterElement);
  };

  port.onMessage.addListener(({ counter }: MessageBackgroundToContentI) => {
    insertCounter(counter);
  });

  const incrementCounterValue = ({ tabId }: MessagePopupToContentI) => {
    const messageData: MessageContentToBackgroundI = { tabId };
    port.postMessage(messageData);
  };

  // perform cleanup here
  port.onDisconnect.addListener(() => {
    browser.runtime.onMessage.removeListener(incrementCounterValue);
  });

  browser.runtime.onMessage.addListener(incrementCounterValue);
})();
