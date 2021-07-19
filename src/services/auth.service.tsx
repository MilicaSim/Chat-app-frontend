
import axios from './axios'

class AuthService {

    signIn = (params = {}) => {
        return axios.post('auth/login', params);
    }
}

export default new AuthService();