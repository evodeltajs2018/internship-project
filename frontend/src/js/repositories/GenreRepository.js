import Config from "../utils/Config";

class GenreRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getGenres() {
		return fetch(this.baseurl +"/genres")
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new GenreRepository();