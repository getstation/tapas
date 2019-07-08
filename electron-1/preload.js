const { ipcRenderer } = require('electron');

window.bx = {
  /**
   * Returns a promise resolving to the actual name of this electron application.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetname
   */
  getName() {
    // Value should come from `electron.app.getName()`
    return new Promise((resolve) => {
      ipcRenderer.send('name-message');
      ipcRenderer.on('name-reply', (event, arg) => {
        resolve(arg)
      });
    });
  },
  /**
   * Returns a promise resolving to the actual version of this electron application.
   * @see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetversion
   */
  getVersion() {
    // Value should come from `electron.app.getVersion()`
    return new Promise((resolve) => {
      ipcRenderer.send('version-message');
      ipcRenderer.on('version-reply', (event, arg) => {
        resolve(arg)
      });
    });
  },
}
