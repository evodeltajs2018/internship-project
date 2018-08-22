import Config from "../utils/Config";

class RegisterRepository {
    constructor() {
        this.baseurl = Config.server.url + ":" + Config.server.port;
    }

    createUser(data) {
        console.log(data);
        return fetch(
            this.baseurl + '/register', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
        )
            .then(response => {
                console.log(response.json());
            })
            .catch(err => console.error);
    }
}

export default new RegisterRepository();