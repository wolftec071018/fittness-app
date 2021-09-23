// admin controller
const controller = require('../controllers/admin.controller');
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
     * Admin access
     * ------------
     * @requires {void, isAdmin}
     *
     * @returns {JSON} admin
     */
    app.get(
        "/api/admin/",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
}