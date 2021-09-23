/**
 * User routes
 * -----------
 * User views for athletes
 */

// controller for user data
const controller = require("../controllers/user.controller");
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
     * All access
     * ----------
     * @requires {void}
     *
     * @returns {String} message
     */
    app.get(
        "/api/all",
        controller.allAccessBoard
    );

    /**
     * User detail
     * -----------
     * User detail view with profile, address, goals, athlete, trainer
     */
    app.get(
        "/api/user/",
        [authJwt.verifyToken],
        controller.userBoard
    );
}