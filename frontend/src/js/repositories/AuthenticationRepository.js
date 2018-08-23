import Config from "../utils/Config";

class AuthenticationRepository {
    constructor() {
        this.baseurl = Config.server.url + ":" + Config.server.port;
    }

    createUser(data) {
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
                return response.json();
            })
            .then(result => {
                return result
            })
            .catch(err => console.log(err));
    }

    loginUser(data) {
        return fetch(
            this.baseurl + '/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
        )
            .then(response => {
                return response.json();
            })
            .then(result => {
                return result
            })
            .catch(err => console.log(err));
    }

    editUser(data) {
        return fetch(
            this.baseurl + '/edit', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(data)
            }
        )
            .then(response => {
                return response.json();
            })
            .then(result => {
                return result
            })
            .catch(err => console.log(err));
    }

    getUser(email) {
        return fetch(this.baseurl + "/user/" + email)
            .then(response => response.json())
            .catch(err => Toaster.showError("Error getting user data"));
    }
}

export default new AuthenticationRepository();