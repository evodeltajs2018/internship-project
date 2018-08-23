import Config from "../utils/Config";
import TokenService from "../services/auth/TokenService";

class SoundTypeRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getTypes() {
		return fetch(this.baseurl + "/types", TokenService.getTokenHeader())
			.then(response =>  {
				if(response.status != '403'){
					return response.json()
				}else{
					return null;
				}})
			.catch(err => console.error(err));
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
			.then(response =>  {
				if(response.status != '403'){
					return response.json()
				}else{
					return null;
				}})
			.catch(err => console.error(err));
	}

	getTypeById(id) {
		return fetch(this.baseurl + "/types/" + id, TokenService.getTokenHeader())
		.then(response => {
			if(response.status != '403'){
				return response.json()
			}else{
				return null;
			}})
		.catch(err => console.error(err));

	}

	editTypeById(data, id) {
		const options = {
			method: "PUT",
			body: JSON.stringify(data),
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + '/types/' + id, options)
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	getAllTypes(pagination, filter) {
		const name = filter.name;

		return fetch(
			this.baseurl +`/typeall?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}`,
			TokenService.getTokenHeader()
		)
		.then(response => {
			if(response.status != '403'){
				return response.json()
			}else{
				return null;
			}})
		.catch(err => console.error(err));
	}

	deleteSound(typeId) {
		const options = {
			method: "DELETE",
			...TokenService.getTokenHeader()
		}
		
		return fetch(this.baseurl + "/types/" + typeId, options)
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new SoundTypeRepository();