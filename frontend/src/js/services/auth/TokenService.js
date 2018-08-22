class TokenService {
    setToken(token) {
        window.localStorage.setItem('token', token);
    }

    getToken() {
        return 
    }
}

export default new TokenService();