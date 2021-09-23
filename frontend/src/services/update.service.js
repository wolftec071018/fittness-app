import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

// headers: authHeader is how you pass the token for
// accessing protected data
class UpdateService {
    // get the user board
    // returns json
    updateAddress(street, city, state, zipcode) {
        return axios.put(
            API_URL + 'address/update/',
            {
                street: street,
                city: city,
                state: state,
                zipcode: zipcode
            },
            { headers: authHeader() }
            );
    }

    // get user data based on the current user
    updateGoals(currentWeight, goalWeight, height) {
        return axios.put(
            API_URL + 'goal/update/',
            {
                currentWeight: currentWeight,
                goalWeight: goalWeight,
                height: height
            },
            { headers: authHeader() }
            );
    }
    // // need req.body.setPublicProfile
    // app.post(
    //     "/api/public/view/",
    //     [
    //         authJwt.verifyToken,
    //     ],
    //     controller.updateView
    // );
    updatePrivacy(setPublicProfile){
        return axios.post(API_URL + 'public/view/', 
        { 
            setPublicProfile: setPublicProfile,
        },
        { headers: authHeader()}
            );
           
        }
}

export default new UpdateService();
