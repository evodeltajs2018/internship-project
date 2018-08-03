class SoundRepository {
	constructor() {
	}

	sendData(data) {
		const xhr = new XMLHttpRequest();
		
		xhr.onload = function () {
			console.log(this);
		}
		
		xhr.open("POST", "http://localhost:5000/sound", true);
		
		xhr.setRequestHeader("Content-Type", "application/json");

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
}

export default new SoundRepository();