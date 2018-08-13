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

}

export default new SoundTypeRepository();