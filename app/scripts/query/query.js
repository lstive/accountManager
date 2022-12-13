// window events
window.api.toMain('get-cuentas', null);
window.api.fromMain('res-cuentas', (event, data) => {
	// real javascript
	let tbody = document.querySelector('#table-usuario tbody');
	let row = null;
	let nodes = [];
	data.forEach(el => {
		row = document.createElement('tr');

		nodes[0] = document.createElement('td');
		nodes[1] = document.createElement('td');
		nodes[2] = document.createElement('td');
		nodes[3] = document.createElement('button');
		nodes[4] = document.createElement('button');
		
		nodes[0].append(document.createTextNode(el.dataValues.id));
		nodes[1].append(document.createTextNode(el.dataValues.correo));
		nodes[2].append(document.createTextNode(el.dataValues.pass));

		// botones de cada fila para modificar
		nodes[3].append(document.createTextNode('borrar'));
		nodes[4].append(document.createTextNode('modificar'));

		row.append(nodes[0]);
		row.append(nodes[1]);
		row.append(nodes[2]);
		row.append(nodes[3]);
		row.append(nodes[4]);
		
		tbody.append(row);
	});
});

// modificar cuentas
document.getElementById('button-add').addEventListener('click', event => {
	let data = {
		correo:document.querySelector('input[name="user"]').value,
		pass:document.querySelector('input[name="pass"]').value
	};

	console.log('==================');
	console.log(data);
	window.api.toMain('add-cuenta', data);
});

// delegacion de eventos
let lastId = null;
document.getElementById('table-usuario').addEventListener('click', event => {
	let id_cuenta = event.target.parentNode.childNodes[0].innerText;
	lastId = id_cuenta;
	
	if(event.target.innerText == 'borrar'){
		// borrar registro
		window.api.toMain('delete-cuenta', {id:id_cuenta});
	}else if(event.target.innerText == 'modificar'){
		// colocar valores en entradas para modificar
		let correo = event.target.parentNode.childNodes[1].innerText;
		let password = event.target.parentNode.childNodes[2].innerText;

		// cambiando valores en los input
		document.querySelector('input[name="user"]').value = correo;
		document.querySelector('input[name="pass"]').value = password;
	}
});

window.api.fromMain('refresh-cuenta', (event, data) => {
	window.location.reload();
});

// continuacion de la programacion
document.getElementById('button-update').addEventListener('click', event => {
	let data = {
		id:lastId,
		correo:document.querySelector('input[name="user"]').value,
		pass:document.querySelector('input[name="pass"]').value
	};
	
	window.api.toMain('update-cuenta', data);
});

window.api.fromMain('update-cuenta-res', (event, data) => {
	window.location.reload();
});
