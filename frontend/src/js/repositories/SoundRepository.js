import Router from "../services/router/Router";

class SoundRepository {
	constructor() {
	}

	sendData(data) {
		const xhr = new XMLHttpRequest();
		
		xhr.open("POST", "http://localhost:5000/sound", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		
		xhr.onload = function () {
		}
		
		data = JSON.stringify(data);
		xhr.send(data);
	}

	getSoundTypes(onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/sound", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	getSoundById(onSuccess, id) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/sound/" + id, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (this.responseText == '') {
					return Router.goToUrl('/sounds');
				}
				onSuccess(JSON.parse(this.responseText));
			}
		};
		xhr.send();
	}

	editSoundById(data, id) {
		const xhr = new XMLHttpRequest();
		
		xhr.open("POST", "http://localhost:5000/sound/" + id, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		
		xhr.onload = function () {
		}
		
		data = JSON.stringify(data);
		xhr.send(data);
	}
}

export default new SoundRepository();