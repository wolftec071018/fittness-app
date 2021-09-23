import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    const token = localStorage.getItem("jwtToken'"); 
    axios.defaults.headers.common['x-access-token'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}