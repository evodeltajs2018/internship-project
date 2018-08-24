import Config from "../utils/Config";
import TokenService from "../services/auth/TokenService";
import Navigator from "../services/router/Navigator";
import Toaster from "../utils/Toaster";

class SoundRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	createSound(data) {
		const fd = new FormData();

		for (name in data) {
			fd.append(name, data[name]);
		}

		const options = {
			method: 'POST',
			body: fd,
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + '/sounds', options)
			.then(response => {
				if (response.status != '403') {
					Toaster.showSuccess("Sound added successfuly");
					return response.json()
				} else {
					return null;
				}
			})
			.catch(err => Toaster.showError("Error adding sound"));
	}

	getSoundById(id) {
		return fetch(this.baseurl + "/sounds/" + id, TokenService.getTokenHeader())
			.then(response => {
				if (response.status != '403') {
					return response.json()
				} else {
					Navigator.goToUrl("/forbidden");
					return;
				}
			})
			.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSplicerSoundsById() {
		return fetch(this.baseurl + "/splicer")
			.then(response => response.json())
			.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSplicerSounds() {
		return fetch(this.baseurl + "/splicer")
			.then(response => response.json())
			.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSoundsByType(typeId) {
		return fetch(this.baseurl + "/splicer/" + typeId, TokenService.getTokenHeader())
			.then(response => response.json())
			.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSoundDataById(id) {
		return fetch(this.baseurl + "/sounds/audio/" + id, TokenService.getTokenHeader())
			.then(response => {
				if (response.status != '403') {
					return response.arrayBuffer();
				} else {
					throw Error("Forbidden")
				}
			})
			.then(arrayBuffer => {
				return arrayBuffer;
			})
			.catch(err => Toaster.showError("Error getting sound"));

	}

	editSoundById(data, id, extension) {
		const fd = new FormData();

		fd.append("name", data.name);
		fd.append("type", data.type);
		fd.append("image", data.src);
		fd.append("value", new Blob([data.value], { type: `audio/${extension}` }));

		const options = {
			method: "PUT",
			body: fd,
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + '/sounds/' + id, options)
			.then(response => {
				if (response.status != '403') {
					Toaster.showSuccess("Sound edited successfuly");
					return response.json()
				} else {
					Navigator.goToUrl("/forbidden");
					return;
				}
			})
			.catch(err => Toaster.showError("Error editing sounds"));
	}

	getAllSounds(pagination, filter) {
		const name = filter.name;
		const type = filter.type;

		return fetch(
			this.baseurl + `/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}&type=${type}`, TokenService.getTokenHeader())
			.then(response => {
				if (response.status != '403') {
					return response.json()
				} else {
					if(TokenService.getToken()){
						Navigator.goToUrl("/forbidden");
					}else{
						Navigator.goToUrl("/login");
					}
					return;
				}
			})
			.catch(err => console.error(err));
	}

	deleteSound(soundId) {
		const options = {
			method: "DELETE",
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + "/sounds/" + soundId, options)
			.then(response => {
				Toaster.showSuccess("Sound deleted successfuly");
				return response.json();
			})
			.catch(err => Toaster.showError("Error getting sounds"));
	}
}

export default new SoundRepository();
