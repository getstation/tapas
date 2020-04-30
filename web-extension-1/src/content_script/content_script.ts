const port = browser.runtime.connect(browser.runtime.id, { name: 'content_script/lifecycle' });

port.onMessage.addListener(m => {
  insertCounter(m.counter);
});

// perform cleanup here
port.onDisconnect.addListener(() => {
  console.log('cleanup');
});

const removeEverything = () => {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
};

const insertCounter = counter => {
  removeEverything();
  const counterElement = document.createTextNode(`La fenêtre contextuelle a ouvert ${counter} fois sur cet onglet`);
  document.body.appendChild(counterElement);
};

const changeCounterValue = request => {
  port.postMessage({ tabId: request.tabId });
};

// insertCounter(0);
browser.runtime.onMessage.addListener(changeCounterValue);
