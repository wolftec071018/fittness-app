import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

// headers: authHeader is how you pass the token for
// accessing protected data
class UserService {
    // get the user board
    // returns json
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    // get trainer data
    getTrainerBoard() {
        return axios.get(API_URL + 'trainer/', { headers: authHeader() });
    }

    // get admin data (future use)
    getAdminBoard() {
        return axios.get(API_URL + 'admin/', { headers: authHeader() });
    }
}

export default new UserService();
