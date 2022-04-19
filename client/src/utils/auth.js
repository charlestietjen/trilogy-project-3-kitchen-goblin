import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decode.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken, signup = false) {
        localStorage.setItem('id_token', idToken);

        signup ? window.location.assign('/avatar') :
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();