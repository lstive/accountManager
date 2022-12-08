const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	toMain:(signal, data) => {
		ipcRenderer.send(signal, data);
	},
	fromMain:(signal, handler) => {
		ipcRenderer.on(signal, handler);
	}
});
