class ProjectsRepository {
	constructor() {
	}

	getData(onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/projects", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}