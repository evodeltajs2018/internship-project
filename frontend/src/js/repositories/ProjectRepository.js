import Config from "../utils/Config";

class ProjectRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getProjects() {
		return fetch(this.baseurl + "/projects")
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	getProjectById(id) {
		return fetch(this.baseurl + "/projects/" + id)
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	addProject(data) {
		return fetch(this.baseurl + "/projects", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	editProjectById(data, id) {
		return fetch(this.baseurl + "/projects/" + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	deleteProject(projectId) {
		return fetch(this.baseurl +"/projects/" + projectId, {
			method: "DELETE"
		})
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new ProjectRepository();