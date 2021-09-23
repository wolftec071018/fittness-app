// require('dotenv').config();
/**
 * Auth Config
 * -----------
 * @secretAuthKey : key to be used to create hash key
 */
module.exports = {
    port: 5000,
    socketPort: 5200,
    secretAuthKey: 'fitness-workout-auth-key',
    salt: 8,
    dbUsername: 'fitness_admin',
    dbPassword: '2021-fitness-tracker'
}