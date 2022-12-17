// evento cambiar a registro
document.getElementById('button-reg').addEventListener('click', event => {
	window.location = 'registrar.html';
});

document.getElementById('button-log').addEventListener('click', event => {
	let data = {
		user:document.querySelector('input[name="user"]').value,
		pass:document.querySelector('input[name="pass"]').value
	};

	window.api.toMain('get-sesion', data);
});

window.api.fromMain('res-sesion', (event, data) => {
	window.location.href = 'home.html';
});

// event borrar configuracion
document.getElementsByClassName('config-button')[0].addEventListener('click', event => {
	window.api.toMain('delete-config', null);
});
