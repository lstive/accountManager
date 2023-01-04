const { contextBridge, ipcRenderer } = require('electron');

// exposicion de los contenidos al render
contextBridge.exposeInMainWorld('api', {
	toMain:(signal, data) => {
		ipcRenderer.send(signal, data);
	},
	fromMain:(signal, handler) => {
		ipcRenderer.on(signal, handler);
	}
});
