const { app, BrowserWindow } = require('electron');
const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

let window = null;

// fucntion for create the window
function createWindow(){	
	window = new BrowserWindow({
		width:600,
		height:400,
		webPreferences:{
			nodeIntegration:false,
			contextIsolation:true,
			preload:path.join(__dirname, 'preload.js')
		}				
	});

	window.loadFile('views/index.html');
	window.webContents.openDevTools();
}

// starting the window
app.whenReady().then(createWindow);
