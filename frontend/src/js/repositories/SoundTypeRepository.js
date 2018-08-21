import Config from "../utils/Config";
import Toaster from "../utils/Toaster";

class SoundTypeRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getSoundTypes() {
		return fetch(this.baseurl + "/types")
		.then(response => response.json())
		.catch(err =>  Toaster.showError("Types getting failed"));
	}
	getIconSrcById() {
		return fetch(this.baseurl + "/splicer")
		.then(response => response.json())
		.catch(err => Toaster.showError("Icon getting failed"));
	}

	getTypes() {
		return fetch(this.baseurl + "/types")
			.then(response => response.json())
			.catch(err => Toaster.showError("Types getting failed"));
	}

	createType(data) {
		return fetch(
			this.baseurl + '/types', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			},
		)
			.then(response => {
				Toaster.showSuccess("Type added successfuly");
				return response.json();
			})
			.catch(err => Toaster.showError("Types creating failed"));
	}

	getTypeById(id) {
		return fetch(this.baseurl + "/types/" + id)
		.then(response => response.json())
		.catch(err => Toaster.showError("Types getting failed"));

	}

	editTypeById(data, id) {
		return fetch(this.baseurl + '/types/' + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			Toaster.showSuccess("Type edited successfuly");
			return response.json();
		})
		.catch(err => Toaster.showError("Type editing failed"));
	}

	getAllTypes(pagination, filter) {
		const name = filter.name;

		return fetch(
			this.baseurl +`/typeall?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}`,
		)
		.then(response => response.json())
		.catch(err => Toaster.showError("Types getting failed"));
	}

	deleteSound(typeId) {
		return fetch(
			this.baseurl + "/types/" + typeId,
			{
				method: "DELETE"
			}
		)
		.then(response => {
			Toaster.showSuccess("Type deleted successfuly");
			return response.json();
		})
		.catch(err => Toaster.showError("Sound deleting failed"));
	}
}

export default new SoundTypeRepository();