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
				if (this.responseText == 0) {
					return Navigator.goToUrl('/404', { data: "404" });
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

	editSoundById(data, id, extension) {
		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		fd.append("name", data.name);
		fd.append("type", data.type);
		fd.append("value", new Blob([data.value], {type: `audio/${extension}`} ));

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