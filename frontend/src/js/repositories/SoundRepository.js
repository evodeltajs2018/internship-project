import Config from "../utils/Config";
import TokenService from "../services/auth/TokenService";
import Navigator from "../services/router/Navigator";

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

		console.log(options);

		return fetch(this.baseurl + '/sounds', options) 
			.then(response => {
				if(response.status != '403'){
					return response.json()
				}else{
					return null;
				}})
			.catch(err => console.error);
	}

	getSoundById(id) {
		return fetch(this.baseurl + "/sounds/" + id, TokenService.getTokenHeader())
			.then(response => {
				if(response.status != '403'){
					return response.json()
				}else{
					Navigator.goToUrl("/forbidden");
					return;
				}})
			.catch(err => console.error(err));

	}

	getSoundDataById(id) {
		return fetch(this.baseurl + "/sounds/audio/" + id, TokenService.getTokenHeader())
			.then(response => {
				if(response.status != '403'){
					return response.arrayBuffer();
				}else{
					throw Error("Forbidden")
				}})
			.then(arrayBuffer => {
				return arrayBuffer;
			})
			.catch(err => {return null;});
	}

	editSoundById(data, id, extension) {
		const fd = new FormData();

		fd.append("name", data.name);
		fd.append("type", data.type);
		fd.append("value", new Blob([data.value], { type: `audio/${extension}` }));

		const options = {
			method: "PUT",
			body: fd,
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + '/sounds/' + id, options)
			.then(response => {
				if(response.status != '403'){
					return response.json()
				}else{
					return null;
				}})
			.catch(err => console.error(err));
	}

	getAllSounds(pagination, filter) {
		const name = filter.name;
		const type = filter.type;

		return fetch(
			this.baseurl + `/sounds?page=${pagination.currentPage}&perpage=${pagination.itemsPerPage}&name=${name}&type=${type}`, TokenService.getTokenHeader())
			.then(response => {
				if(response.status != '403'){
					return response.json()
				}else{
					Navigator.goToUrl("/forbidden");
					return;
				}})
			.catch(err => console.error(err));
	}

	deleteSound(soundId) {
		const options = {
			method: "DELETE",
			...TokenService.getTokenHeader()
		}

		return fetch(this.baseurl + "/sounds/" + soundId, options)
			.then(response =>  response.json())
			.catch(err => console.error(err));
	}
}

export default new SoundRepository();
