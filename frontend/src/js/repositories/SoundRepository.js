import Config from "../utils/Config";

class SoundRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	sendData(data) {
		return fetch(this.baseurl +"/sounds", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.catch(err => console.error(err));
		
	}

	getSoundById(id) {
		return fetch(this.baseurl + "/sounds/" + id)
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	editSoundById(data, id) {
		return fetch(this.baseurl + "/sounds/" + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	getAllSounds(pagination, filter) {
		const name = filter.name;
		const type = filter.type;

		return fetch(
			this.baseurl +`/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}&type=${type}`,
		)
		.then(response => response.json())
		.catch(err => console.error(err));
	}

	deleteSound(soundId) {
		return fetch(
			this.baseurl + "/sounds/" + soundId,
			{
				method: "DELETE"
			}
		)
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new SoundRepository();