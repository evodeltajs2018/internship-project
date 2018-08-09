import Navigator from "../services/router/Navigator";

class SoundRepository {
	constructor() {
	}

	sendData(data) {
		const xhr = new XMLHttpRequest();
		
		xhr.open("POST", "http://localhost:5000/sound", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				//Navigator.goToUrl("/sounds");
			}
		};

		console.log(data.value.length);
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
					return Navigator.goToUrl('/sounds');
				}
				console.log(JSON.parse(this.responseText));
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	playSound(buffer) {
		const context = new AudioContext();
		context.decodeAudioData(buffer, data => {
			var source = context.createBufferSource(); // creates a sound source
			source.buffer = data;                    // tell the source which sound to play
			source.connect(context.destination);       // connect the source to the context's destination (the speakers)
			source.start(0);  
		})
	}
	

	// 1. split tables
	// 2. validate for sound
	getSoundDataById(id) {
		fetch(`http://localhost:5000/sound/audio/${id}`)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => {
			this.playSound(arrayBuffer);
		})
	}

	editSoundById(data, id) {
		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		for(name in data) {
			fd.append(name, data[name]);
		}
		
		xhr.open("PUT", "http://localhost:5000/sound/" + id, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				// Navigator.goToUrl("/sounds");
			}
		}
		// const result = JSON.stringify(data);

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
		xhr.open("DELETE", "http://localhost:5000/sound/" + soundId, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};
		xhr.send();
	}

}

export default new SoundRepository();