import Config from "../utils/Config";

class SoundRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	createSound(data) {

		const fd = new FormData();

		for (name in data) {
			fd.append(name, data[name]);
		}

		return fetch(
			this.baseurl + '/sounds', {
				method: 'POST',
				body: fd
			},
		)
			.then(response => response.json())
			.catch(err => console.error);
	}

	getSoundById(id) {
		return fetch(this.baseurl + "/sounds/" + id)
			.then(response => response.json())
			.catch(err => console.error(err));

	}

	getSoundDataById(id) {
		return fetch(this.baseurl + "/sounds/audio/" + id)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => {
				return arrayBuffer;
			})
	}

	editSoundById(data, id, extension) {
		const fd = new FormData();

		fd.append("name", data.name);
		fd.append("type", data.type);
		fd.append("value", new Blob([data.value], { type: `audio/${extension}` }));

		return fetch(this.baseurl + '/sounds/' + id, {
			method: "PUT",
			body: fd
		})
			.then(response => response.json())
			.catch(err => console.error(err));
	}

	getAllSounds(pagination, filter) {
		const name = filter.name;
		const type = filter.type;

		return fetch(
			this.baseurl + `/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}&type=${type}`,
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
