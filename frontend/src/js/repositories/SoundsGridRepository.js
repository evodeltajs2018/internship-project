class SoundsGridRepository {
	constructor() {
	}

	getData(pagination, onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", `http://localhost:5000/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}`, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				console.log(JSON.parse(this.responseText));
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
				//console.log(this.responseText);
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}

export default new SoundsGridRepository();