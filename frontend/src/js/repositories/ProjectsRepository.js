class ProjectsRepository {
	constructor() {
	}

	getData(onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:5000/project", true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess(JSON.parse(this.responseText));
			}
		};

		xhr.send();

	}

	deleteProject(projectId, onSuccess) {
		const xhr = new XMLHttpRequest();
		xhr.open("DELETE", "http://localhost:5000/project/" + projectId, true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				onSuccess();
			}
		};

		xhr.send();
	}



}

export default new ProjectsRepository();