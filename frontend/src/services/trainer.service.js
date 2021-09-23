import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:5000/api/';

class TrainerService {

    getAthletes() {
        return axios.get(
            API_URL + "trainer/",
            { headers: authHeader() }
        );
    }

}
export default new TrainerService();