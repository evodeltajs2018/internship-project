class TokenService {
    setToken(token) {
        window.localStorage.setItem('token', token);
    }

    getToken() {
        return window.localStorage.getItem('token');
    }

    getTokenHeader(){
        return {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        }
    }

    isUserAuthenticated() {
        return this.getToken() === true;
    }
}

export default new TokenService();