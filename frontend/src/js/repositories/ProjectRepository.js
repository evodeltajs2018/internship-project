import Navigator from "../services/router/Navigator";

class ProjectRepository {
	constructor() {}

	getProjects(onSuccess) {
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

	getProjectById(onSuccess, id) {
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

	createProject(data) {
		const xhr = new XMLHttpRequest();
		
		xhr.open("POST", "http://localhost:5000/project", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				Navigator.goToUrl("/projects");
			}
		}
		data = JSON.stringify(data);
		xhr.send(data);
	}

	editProjectById(data, id) {
		const xhr = new XMLHttpRequest();
		
		xhr.open("POST", "http://localhost:5000/project/" + id, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				Navigator.goToUrl("/projects");
			}
		}
		
		data = JSON.stringify(data);
		xhr.send(data);
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

export default new ProjectRepository();