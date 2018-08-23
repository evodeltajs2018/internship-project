import Config from "../utils/Config";
import Toaster from "../utils/Toaster";
class ProjectRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

getProjects(pagination, filter) {
		return fetch(
			this.baseurl +`/projects?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${filter.name}&genre=${filter.genreName}`,
		)
		.then(response => response.json())
		.catch(err => Toaster.showError("Failed to get projects"));
	}

	getProjectById(id) {
		return fetch(this.baseurl + "/projects/" + id)
		.then(response => response.json())
		.catch(err => Toaster.showError("Failed"));
	}

	addProject(data) {
		return fetch(this.baseurl + "/projects", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			Toaster.showSuccess("Project added");
			return response.json();
		})
		.catch(err => Toaster.showError("Project adding failed"));
	}

	editProjectById(data, id) {
		return fetch(this.baseurl + "/projects/" + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			Toaster.showSuccess("Project edited successfuly")
			response.json()
		})
		.catch(err => Toaster.showError("Project edit failed"));
	}

	deleteProject(projectId) {
		return fetch(this.baseurl +"/projects/" + projectId, {
			method: "DELETE"
		})
		.then(response => {
			Toaster.showSuccess("Project deleted successfuly")
			response.json()
		})
		.catch(err => Toaster.showError("Project delete failed"));
	}

	getBeatmap(projectId) {
		return fetch(this.baseurl + "/projects/beatmap/" + projectId)
		.then(response => { return response.json(); })
		.catch(err => Toaster.showError("Failed"));
	}

	addBeatmap(beatmap) {
		return fetch(this.baseurl + "/projects/beatmap", {
			method: "POST",
			body: JSON.stringify(beatmap),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.catch(err => Toaster.showError("Beatmap adding failed"));
	}

	editBeatmap(id, beatmap) {
		return fetch(this.baseurl + "/projects/beatmap/" + id, {
			method: "PUT",
			body: JSON.stringify(beatmap),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			Toaster.showSuccess("Project saved successfuly")
			response.json()
		})
		.catch(err => Toaster.showError("Beatmap edit failed"));
	}
}

export default new ProjectRepository();