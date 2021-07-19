import axios from "./axios";

class UserService {

    signUp = (params: any) => {
        return axios.post('user', params);
    }

    getAllUsers = () => {
        return axios.get('user/allUsers');
    }

    getUserWithId = (id: string) => {
        return axios.get( 'user/' + id);
    }

    updateUser = (id: string, params = {}) => {
        return axios.put('user/' + id, params);
    }

    deleteUser = (id: string) => {
        return axios.delete('user/' + id);
    }
}

export default new UserService();