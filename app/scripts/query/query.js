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

document.getElementById('table-usuario').addEventListener('click', event => {
	let id_cuenta = event.target.parentNode.childNodes[0].innerText;
	
	if(event.target.innerText == 'borrar'){
		window.api.toMain('delete-cuenta', {id:id_cuenta});
	}else if(event.target.innerText == 'modificar'){
		
	}
});

window.api.fromMain('refresh-cuenta', (event, data) => {
	window.location.reload();
});
