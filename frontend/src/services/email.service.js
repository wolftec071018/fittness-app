import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:5000/api/';

class EmailService{

    emailInvite(email) {
        return axios.post(
            API_URL + 'invite/',
            {
                email : email,
            },
            { headers: authHeader() }
            );
    }

}
export default new EmailService();
