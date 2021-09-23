import axios from "axios";

// api url where request is gonna be done
const API_URL = "http://localhost:5000/api/auth/";

// auth service to make life easier
class AuthService {

    // login function
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    // logout function
    logout() {
        localStorage.removeItem("user");
    }

    // register or signup user
    register(firstName, lastName, dob, gender, email, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            dob,
            gender,
            email,
            password
        });
    }

    // get the user data from local storage
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
