document.getElementById('button-create').addEventListener('click', event => {
	let info = {
		user:document.querySelector('input[name="user"]').value,
		pass:document.querySelector('input[name="pass"]').value
	};

	window.api.toMain('get-users', info);
});

document.getElementById('button-back').addEventListener('click', event => {
	let info = {
		user:document.querySelector('input[name="user"]').value,
		pass:document.querySelector('input[name="pass"]').value
	};

	window.api.toMain('get-login', info);
});

window.api.fromMain('change-to-login', (event, data) => {
	window.location.href = 'index.html';
});

