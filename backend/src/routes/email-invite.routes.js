/**
 * Email Invite Route
 * ------------------
 * Allows trainers to invite future clients through email.
 *
 * @emailInvite : [token, trainer, duplicate email required] sends an email invite to an email
 */

// invite controller
const controller = require("../controllers/invite.controller");
// middleware authenticator
const { authJwt, verifyParams } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Email invite endpoint
     * ---------------------
     * @requires {String} email
     *
     * @returns {JSON} invite
     */
    app.post(
        
        "/api/invite/",
        [
            authJwt.verifyToken,
            authJwt.isTrainer,
            verifyParams.validEmail
        ],
        controller.emailInvite
    );
}