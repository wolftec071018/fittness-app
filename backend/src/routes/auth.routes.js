/**
 * Auth Routes
 * -----------
 * Signup and login functions
 *
 * @signup : creates a new user, address, and goal.
 * @login : allows users to login using their email/password
 */

// auth controller
const controller = require("../controllers/auth.controller");
// middleware validator
const { verifySignUp, verifyParams } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
       res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept"
       );
       next();
    });

    /**
     * Signup Endpoint
     * ---------------
     * @requires {String} email
     * @requires {String} password
     * @requires {String} firstName
     * @requires {String} lastName
     * @requires {Date} dob
     * @requires {String} gender
     *
     * optional :
     *  @var {String} role
     *  @var {number} invitation
     *
     * @returns {JSON} user
     */
    app.post(
        "/api/auth/signup/",
        // [
        //     verifySignUp.duplicateEmail,
        //     verifySignUp.roleExists,
        //     verifySignUp.validFirstName,
        //     verifySignUp.validLastName,
        //     verifySignUp.validGender,
        //     verifySignUp.validDOB,
        //     verifyParams.validEmail,
        //     verifyParams.validPassword,
        //
        // ],
        controller.signup
    );

    /**
     * Login Endpoint
     * --------------
     * @requires {String} email
     * @requires {String} password
     *
     * @returns {JSON} {
     *      {number} id,
     *      {String} email,
     *      {String[]} roles,
     *      {String} accessToken
     *  }
     */
    app.post(
        "/api/auth/login/",
        controller.login
    );
}