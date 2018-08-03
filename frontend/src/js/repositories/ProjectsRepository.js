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

	getProject(onSuccess, id) {
		const xhr = new XMLHttpRequest();
		let url = "http://localhost:5000/project/" + id;
		
		xhr.open("GET", url, true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}

export default ProjectsRepository;