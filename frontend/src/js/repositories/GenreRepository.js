import Config from "../utils/Config";
import Toaster from "../utils/Toaster";

class GenreRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getGenres() {
		return fetch(this.baseurl +"/genres")
		.then(response => response.json())
		.catch(err => Toaster.showError("Failed to get genres"));
	}
}

export default new GenreRepository();