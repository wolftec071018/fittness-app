import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

class SearchService {

    searchTrainer(city, offset) {
        offset = offset? offset : 0;

        return axios.post(
            API_URL + 'search/trainer/',
            {
                city : city,
                offset: offset
            },
            { headers: authHeader() }
        );
    }

    searchAthlete(city, gender, age, offset) {
        offset = offset? offset : 0;

        return axios.post(
            API_URL + 'search/athlete/',
            {
                city : city,
                gender: gender,
                age: age,
                offset: offset
            },
            { headers: authHeader() }
        );
    }

    searchDistance() {
        return axios.get(
            API_URL + 'search/distance/',
            { headers: authHeader() }
        );
    }

    viewProfile(viewId) {
        return axios.get(
            API_URL + `search/view/${viewId}/`,
            { headers: authHeader() }
        );
    }

}
export default new SearchService();