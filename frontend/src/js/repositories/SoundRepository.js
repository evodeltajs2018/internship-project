import Config from "../utils/Config";
import Toaster from "../utils/Toaster";

class SoundRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	createSound(data) {
	
		const fd = new FormData();

		for(name in data) {
			fd.append(name, data[name]);
		}

		return fetch(
			this.baseurl + '/sounds', {
				method: 'POST',
				body: fd
			},
		)
		.then(response => {
			Toaster.showSuccess("Sound added successfuly");
			return response.json();
		})
		.catch(err => Toaster.showError("Error adding sound"));
	}

	getSplicerSoundsById(){
		return fetch(this.baseurl + "/splicer")
		.then(response => response.json())
		.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSplicerSounds(){
		return fetch(this.baseurl + "/splicer")
		.then(response => response.json())
		.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSoundsByType(typeId){
		return fetch(this.baseurl + "/splicer/" + typeId)
		.then(response => response.json())
		.catch(err => Toaster.showError("Error getting sounds"));
	}

	getSoundById(id) {
		return fetch(this.baseurl + "/sounds/" + id)
		.then(response => response.json())
		.catch(err => Toaster.showError("Error getting sounds"));

	}
	
	getSoundDataById(id) {
		return fetch(this.baseurl + "/sounds/audio/" + id)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => {
			return arrayBuffer;
		})
		.catch(err => Toaster.showError("Error getting sound"));
	}

	editSoundById(data, id, extension) {
		const fd = new FormData();

		fd.append("name", data.name);
		fd.append("type", data.type);
		fd.append("value", new Blob([data.value], {type: `audio/${extension}`} ));

		return fetch(this.baseurl + '/sounds/' + id, {
			method: "PUT",
			body: fd
		})
		.then(response => {
			Toaster.showSuccess("Sound edited successfuly");
			return response.json();
		})
		.catch(err => Toaster.showError("Error editing sounds"));
	}

	getAllSounds(pagination, filter) {
		const name = filter.name;
		const type = filter.type;

		return fetch(
			this.baseurl +`/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}&type=${type}`,
		)
		.then(response => response.json())
		.catch(err => Toaster.showError("Error getting sounds"));
	}

	deleteSound(soundId) {
		return fetch(
			this.baseurl + "/sounds/" + soundId,
			{
				method: "DELETE"
			}
		)
		.then(response => {
			Toaster.showSuccess("Sound deleted successfuly");
			return response.json();
		})
		.catch(err => Toaster.showError("Error deleting sound"));
	}
}

export default new SoundRepository();
