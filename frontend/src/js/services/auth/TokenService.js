class TokenService {
    setToken(token) {
        window.localStorage.setItem('token', token);
    }

    getToken() {
        return window.localStorage.getItem('token');
    }

    destroyToken() {
        window.localStorage.removeItem('token');
    }
}

export default new TokenService();