'use strict';

const { ipcRenderer } = require('electron');

const bx = {
  /**
   * Generic promise gen to dialog with main/parent process
   * @param {string} info | info aboout app to get [name,version..]
   */
  getInfos(info) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('getAppInfo', info);
      ipcRenderer.on(info, (response, result) => {
        // Main has not any info about, just stop here
        if (!result) return reject('Asked a non defined app infos');
        resolve(result);
      });
    })
  },
  getVersion() {
    return this.getInfos('version');
  },
  getName() {
    return this.getInfos('name');
  }
};

// Freeze bx because it should be read only
module.exports.bx = Object.freeze(bx);