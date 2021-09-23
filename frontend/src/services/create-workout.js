import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

const API_URL = 'http://localhost:5000/api/';

class Createworkout{

    emailInvite(email) {
        let userId = AuthService.getCurrentUser().id;
        return axios.post(
            API_URL + 'invite/',
            {
                email : email,
            },
            { headers: authHeader() }
            );
    }

}
export default new Createworkout();
