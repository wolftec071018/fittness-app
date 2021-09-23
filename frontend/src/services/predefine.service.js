import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

class PredefineService {

    initial() {
        return axios.get(
            API_URL + 'predefined/workouts/initial/',
            {
                headers: authHeader()
            });
    }

}
export default new PredefineService();