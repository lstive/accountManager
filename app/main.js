const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const path = require('path');
const { Configer } = require('./scripts/configer.js');
const fs = require('fs');

let window = null;
let usuario = null;

// fucntion for create the window
function createWindow(){	
	window = new BrowserWindow({
		width:900,
		height:500,
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
let config = new Configer('config.json');
let prop = {
	db_name:'pass_database.db',
	db_path:app.getPath('home'),
	db_exist:false
};

if(!fs.existsSync(path.join(prop.db_path, prop.db_name))){
	console.log('el archivo de configuracion no existe sera creado');
	config.setConfig(prop);
	console.log(config.getConfig());
}else{
	console.log('el archivo de configuracion ya existe');
}

// database model
const sequelize = new Sequelize({
	dialect:'sqlite',
	storage:path.join(prop.db_path, prop.db_name)
});

try{
	sequelize.authenticate();
}catch(err){
	console.log(err);	
}

// existe la database
let myConfig = config.getConfig();

try{
	if(myConfig.db_exist == false){
		sequelize.query(
			"create table usuario(" +
			"user varchar(20) primary key not null," +
			"pass varchar(120) not null)"
		);

		sequelize.query(
			"create table cuenta(" +
			"id integer primary key autoincrement," +
			"user_usuario varchar(20) not null," +
			"correo varchar(50) not null," +
			"pass varchar(20) not null," +
			"foreign key(user_usuario) references usuario(user) on delete cascade)"
		);

		myConfig.db_exist = true;
		config.setConfig(myConfig);
		console.log('se ha creado la base de datos');
	}else{
		console.log('la base de datos ya existe');
	}
}catch(err){
	console.log('error al crear base de datos');
}finally{
	
}

class Usuario extends Model{}
class Cuenta extends Model{}

// usuario
Usuario.init({
	user:{
		type:DataTypes.STRING,
		notNull:true,
		primaryKey:true
	},
	pass:{
		type:DataTypes.STRING,
		notNull:true
	}
}, {
	sequelize,
	modelName:'usuario',
	tableName:'usuario',
	freezeTableName:true,
	timestamps:false
});

// cuentas
Cuenta.init({
	id:{
		type:DataTypes.INTEGER,
		notNull:true,
		primaryKey:true,
		autoIncrement:true
	},
	user_usuario:{
		type:DataTypes.STRING,
		notNull:true
	},
	correo:{
		type:DataTypes.STRING,
		notNull:true
	},
	pass:{
		type:DataTypes.STRING,
		notNull:true
	}
}, {
	sequelize,
	modelName:'cuenta',
	tableName:'cuenta',
	freezeTableName:true,
	timestamps:false
});

// relacion de tablas
try{
	Usuario.hasMany(Cuenta, { sourceKey:'user', foreignKey:'user_usuario' });
	Cuenta.belongsTo(Usuario, { targetKey:'user', foreignKey:'user_usuario' });
}catch(err){
	console.log('errrorr=================');
	console.log(err);
}

// eventos
ipcMain.on('get-users', (event, data) => {
	Usuario.findAll({
		where:{
			[Op.and]:[
				{user:data.user},
				{pass:Buffer.from(data.pass).toString('base64')}
			]
		}
	}).then(query => {
		if(query.length != 0){
			dialog.showMessageBox({message:'No es posible crear el usuario'});
		}else{
			let usuario = Usuario.build({ user:data.user, pass:Buffer.from(data.pass).toString('base64')});
			usuario.save();
			dialog.showMessageBox({message:'Usuario creado con exito'});
		}
	});
});


ipcMain.on('get-login', (event, data) => {
	event.reply('change-to-login', null);
});

ipcMain.on('get-sesion', (event, data) => {
	Usuario.findAll({
		where:{
			[Op.and]:[
				{user:data.user},
				{pass:Buffer.from(data.pass).toString('base64')}
			]
		}
	}).then(query => {
		if(query){
			usuario = query[0].dataValues.user;
			console.log(query[0].dataValues.pass + '  ===  ' + Buffer.from(data.pass).toString('base64'));
			event.reply('res-sesion', null);
		}else{
			dialog.showMessageBox({message:'Datos invalidos'});
		}
	});
});


ipcMain.on('get-cuentas', (event, data) => {
	Cuenta.findAll().then(query => {
		query.forEach(el => {
			el.pass = Buffer.from(el.dataValues.pass, 'base64').toString('ascii');
		});
		console.log('============================== aaa ===========');
		console.log(query);
		event.reply('res-cuentas', query);
	});
});

ipcMain.on('add-cuenta', (event, data) => {
	let cuenta = Cuenta.build({
		id:null,
		user_usuario:usuario,
		correo:data.correo,
		pass:Buffer.from(data.pass).toString('base64')
	});

	console.log(cuenta);
	cuenta.save();

	event.reply('refresh-cuenta', null);
});

ipcMain.on('delete-cuenta', (event, data) => {
	Cuenta.destroy({
		where:{
			id:data.id
		}
	});

	event.reply('refresh-cuenta', null);
});
