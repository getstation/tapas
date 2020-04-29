const port = browser.runtime.connect(browser.runtime.id, { name: 'content_script/lifecycle' });

// perform cleanup here
port.onDisconnect.addListener(() => {
  console.log('cleanup');
});
