import Navigator from "../services/router/Navigator";

class GenreRepository {
	constructor() {}

	getGenres(onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/genres", true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}

export default new GenreRepository();