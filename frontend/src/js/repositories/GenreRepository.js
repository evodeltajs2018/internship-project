import Config from "../utils/Config";
import TokenService from "../services/auth/TokenService";

class GenreRepository {
	constructor() {
		this.baseurl = Config.server.url + ":" + Config.server.port;
	}

	getGenres() {
		return fetch(this.baseurl +"/genres", TokenService.getTokenHeader())
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}

export default new GenreRepository();

