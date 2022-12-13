// los archivos de include son include once
const { app } = require('electron');
const path = require('path');
const fs = require('fs');


/**
* Clase que permite escribir y modificar archivos .json
*/
class Configer{
	/**
	 * @param name - nombre del archivo .json
	 */
	constructor(name, path){
		this.path = path;
		this.file = name;
	}

	/**
	 * @param config - un objeto a escribir en el archivo json
	 */
	setConfig(config){
		try{
			if(!fs.existsSync(this.path)){
				fs.mkdirSync(this.path);
			}
			fs.writeFileSync(path.join(this.path, this.file), JSON.stringify(config));
		}catch(err){
			throw err;
		}
	}

	/**
	 * devuelve el objeto del archivo .json
	 */
	getConfig(){
		let file = null;
		
		try{
			file = JSON.parse(fs.readFileSync(path.join(this.path, this.file)));
			return file;
		}catch(err){
			return err;
		}
	}
}

exports.Configer = Configer;
