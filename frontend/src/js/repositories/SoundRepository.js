import Navigator from "../services/router/Navigator";

class SoundRepository {
	constructor() {
	}

	sendData(data) {
		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		for(name in data) {
			fd.append(name, data[name]);
		}

		xhr.open("POST", "http://localhost:5000/sounds", true);
		//xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				Navigator.goToUrl("/sounds");
			}
		};

		xhr.send(fd);
	}

	getSoundTypes(onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/types", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	getSoundById(onSuccess, id) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/sounds/" + id, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (this.responseText == '') {
					return Navigator.goToUrl('/sounds');
				}
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
	
	getSoundDataById(id) {
		return fetch(`http://localhost:5000/sounds/audio/${id}`)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => {
			return arrayBuffer;
		})
	}

	editSoundById(data, id) {
		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		for(name in data) {
			fd.append(name, data[name]);
		}
		
		xhr.open("PUT", "http://localhost:5000/sounds/" + id, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				Navigator.goToUrl("/sounds");
			}
		}

		xhr.send(fd);
	}

	getData(pagination, onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", `http://localhost:5000/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}`, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};
		xhr.send();
	}

	deleteSound(soundId, onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("DELETE", "http://localhost:5000/sounds/" + soundId, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};
		xhr.send();
	}

}

export default new SoundRepository();