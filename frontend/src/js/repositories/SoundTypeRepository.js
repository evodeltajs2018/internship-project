import Config from "../utils/Config";

class SoundTypeRepository {
  constructor() {
    this.baseurl = Config.server.url + ":" + Config.server.port;
  }

  getSoundTypes() {
    return fetch(this.baseurl + "/types")
      .then(response => response.json())
      .catch(err => console.error(err));
  }
  getIconSrcById() {
    return fetch(this.baseurl + "/splicer")
      .then(response => response.json())
      .catch(err => console.error(err));
  }

	getTypes() {
		return fetch(this.baseurl + "/types")
			.then(response => response.json())
			.catch(err => console.error(err));
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
			.then(response => response.json())
			.catch(err => console.error(err));
	}

	getTypeById(id) {
		return fetch(this.baseurl + "/types/" + id)
		.then(response => response.json())
		.catch(err => console.error(err));

	}

	editTypeById(data, id) {
		return fetch(this.baseurl + '/types/' + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	getAllTypes(pagination, filter) {
		const name = filter.name;

		return fetch(
			this.baseurl +`/typeall?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}`,
		)
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	deleteSound(typeId) {
		return fetch(
			this.baseurl + "/types/" + typeId,
			{
				method: "DELETE"
			}
		)
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new SoundTypeRepository();