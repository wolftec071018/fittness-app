/**
 * Athlete routes
 * -----------
 * Athlete view with workouts
 */

// controller for user data
const controller = require("../controllers/athlete.controller");
// middleware user authenticator
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Athlete detail
     * --------------
     * Athlete detail view of profile
     *
     * @param {number} athleteId
     *
     * @returns {Object} Athlete
     */
    app.get(
        "/api/athlete/",
        [authJwt.verifyToken],
        controller.athleteBoard
    );
}