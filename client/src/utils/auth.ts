import decode from 'jwt-decode';

class AuthService {
    getProfile(){
        return decode(this.getToken()!);
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        try {
            const decoded: { data: { "username": string; "email": string; "_id": string; "avatar": string;}, "iat": number; "exp": number;} = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken(): string | null {
        // if (localStorage.getItem('id_token') !== null){
        // return localStorage.getItem('id_token')};
        const token = localStorage.getItem('id_token');
        return token;
    }

    login(idToken: string, signup = false) {
        localStorage.setItem('id_token', idToken);

        signup ? window.location.assign('/avatar') :
        window.location.assign('/dashboard');
    }

    logout(skip = false) {
        localStorage.removeItem('id_token');
        if (skip){
            return;
        }
        window.location.assign('/');
    }
}

export default new AuthService();