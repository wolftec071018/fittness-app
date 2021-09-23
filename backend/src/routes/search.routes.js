// search controller
const controller = require('../controllers/search.controller');
// middleware user authenticator
const authJwt = require("../middleware/authJwt");

// Search views
// will add middleware at end
// for mvp use. Google maps to come
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Trainer search
     * --------------
     * Searches for trainers in a specific city
     * @requires {req.body : String} city
     */
    app.post(
        "/api/search/trainer/",
        controller.searchTrainer
    );

    /**
     * Athlete search
     * --------------
     * Searches for athletes in a specific city
     * @requires {req.body : String} city
     */
    app.post(
        "/api/search/athlete/",
        controller.searchAthlete
    );

    /**
     * Trainer search by distance
     * --------------------------
     * search for trainers close by the users address
     */
    app.get(
        "/api/search/distance/",
        controller.searchByDistance
    );

    /**
     * View Profile
     * ------------
     * Shows athletes or trainers profiles
     * @requires {req.params : int} viewId
     */
    app.get(
      "/api/search/view/:viewId/",
      controller.viewProfile
    );
};