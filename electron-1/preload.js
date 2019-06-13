const { ipcRenderer } = require('electron');

var BX = function () {

    return {
        getName: () => {
            return new Promise((resolve) => {
                ipcRenderer.send('name', 'Hello');
                ipcRenderer.on('nameAnswer', (event, name) => {
                    resolve(name);
                });
            });
        },
        getVersion: () => {
            return new Promise((resolve) => {
                ipcRenderer.send('version', 'Hello');
                ipcRenderer.on('versionAnswer', (event, version) => {
                    resolve(version);
                });
            });
        },
    }
}

window.bx = new BX();
