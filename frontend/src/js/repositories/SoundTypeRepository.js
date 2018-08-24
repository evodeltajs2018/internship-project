import Config from "../utils/Config";
import TokenService from "../services/auth/TokenService";
import Toaster from "../utils/Toaster";

class SoundTypeRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getSoundTypes() {
		return fetch(this.baseurl + "/types", TokenService.getTokenHeader())
			.then(response => {
				if (response.status != '403') {
					return response.json()
				} else {
					return null;
				}
			})
			.catch(err => Toaster.showError("Types getting failed"));
	}
	getIconSrcById() {
		return fetch(this.baseurl + "/splicer")
			.then(response => response.json())
			.catch(err => Toaster.showError("Icon getting failed"));
	}

	createType(data) {

		const optionsHeaders = {
			'Content-Type': 'application/json',
			...TokenService.getTokenHeader().headers
		}

		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: optionsHeaders
		};

		return fetch(this.baseurl + '/types', options)
			.then(response => {
				if (response.status != '403') {
					Toaster.showSuccess("Type added successfuly");
					return response.json()
				} else {
					return null;
				}
			})
			.catch(err => Toaster.showError("Types creating failed"));
	}

	getTypeById(id) {
		return fetch(this.baseurl + "/types/" + id, TokenService.getTokenHeader())
			.then(response => {
				if (response.status != '403') {
					return response.json()
				} else {
					return null;
				}
			})
			.catch(err => Toaster.showError("Types getting failed"));
	}

	editTypeById(data, id) {

		const optionsHeaders = {
			'Content-Type': 'application/json',
			...TokenService.getTokenHeader().headers
		}

		const options = {
			method: "PUT",
			body: JSON.stringify(data),
			headers: optionsHeaders
		}

		return fetch(this.baseurl + '/types/' + id, options)
			.then(response => {
				Toaster.showSuccess("Type edited successfuly");
				return response.json();
			})
			.catch(err => Toaster.showError("Type editing failed"));
	}

	getAllTypes(pagination, filter) {
		const name = filter.name;

		return fetch(
			this.baseurl + `/typeall?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}`,
			TokenService.getTokenHeader()
		)
			.then(response => {
				if (response.status != '403') {
					return response.json()
				} else {
					return null;
				}
			})
			.catch(err => Toaster.showError("Types getting failed"));
	}

	deleteSound(typeId) {
		const options = {
			method: "DELETE",
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + "/types/" + typeId, options)
			.then(response => {
				Toaster.showSuccess("Type deleted successfuly");
				return response.json();
			})
			.catch(err => Toaster.showError("Sound deleting failed"));
	}
}

export default new SoundTypeRepository();