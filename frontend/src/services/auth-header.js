
// retrieves data from the server for protected
// resources (token required)
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        // we are using x-access-token
        return { 'x-access-token': user.accessToken };
    }
    return {};
}
