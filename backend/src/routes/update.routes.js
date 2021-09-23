/**
 * Update Routes
 * -------------
 * Update goal and address for a specific user (:userId)
 *
 * @updateGoal : [token required] updates the :userId goal
 * @updateAddress : [token required] updates the :userId address
 */

// controller for update data
const controller = require("../controllers/update.controller");
// middleware user authenticator
const { authJwt, verifyAddress, verifyUpdate, verifySignUp, verifyParams } = require("../middleware");

module.exports = function (app) {
    // function to control headers and login authentication
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post(
        "/api/profile/update/",
        [
            authJwt.verifyToken
        ],
        controller.updateProfile
    );
    /**
     * Address Update
     * --------------
     * @param {number} userId
     *
     * @requires {String} street
     * @requires {String} city
     * @requires {String} state
     * @requires {number} zipcode
     *
     * @returns : {String} message
     */
    app.post(
        "/api/address/update/",
        [
            authJwt.verifyToken,
            // verifyAddress.validStreet,
            // verifyAddress.validCity,
            // verifyAddress.validState,
            // verifyAddress.validZipCode
        ],
        controller.updateAddress
    );

    /**
     * Goal Update
     * -----------
     * @param {number} userId
     *
     * @requires {number} currentWeight
     * @requires {number} goalWeight
     * @requires {number} height
     * @requires {String} goalType
     *
     * @returns : {String} message
     */
    app.post(
        "/api/goal/update/",
        [
            authJwt.verifyToken,
            // verifyGoals.validGoalType,
            // verifyGoals.validWeight,
            // verifyGoals.validHeight,
        ],
        controller.updateGoal
    );

    /**
     * Email update
     * ---------------------
     * @param {number} userId
     *
     * @requires {String} email
     * @requires {String} password
     * @returns {String} message
     */
    app.post(
        "/api/email/update/",
        [
            authJwt.verifyToken,
            // verifyUpdate.comparePassword,
            // verifyParams.validEmail,
            // verifySignUp.duplicateEmail
        ],
        controller.updateEmail
    );

    /**
     * Password update
     * ---------------------
     * @param {number} userId
     *
     * @requires {String} email
     * @requires {String} newPassword
     * @requires {String} password
     *
     * @returns {String} message
     */
    app.post(
        "/api/password/update/",
        [
            authJwt.verifyToken,
            // verifyParams.validPassword,
            // verifyUpdate.comparePassword,
        ],
        controller.updatePassword
    );

    // need req.body.setPublicProfile
    app.post(
        "/api/public/view/",
        [
            authJwt.verifyToken,
        ],
        controller.updateView
    );
}
