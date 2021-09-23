/**
 * Measurement Routes
 * ------------------
 * Measurements based on body parts id (:userId)
 */

// controller for workout list database
const controller = require("../controllers/measurement.controller");
// middleware user authenticator
const authJwt = require("../middleware/authJwt");
const {singleUpload} = require("../middleware/upload");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Get all the measurements
     *
     * @requires {req.params.athleteId} athlete's id
     *
     * @returns {Array<db.measurements>} measurements related to the body
     */
    app.get(
        "/api/measurement/:bodyPartId/",
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.getMeasurements
    );


    /**
     * Add a new measurement
     *
     * @requires {req.params.athleteId} athlete's ID
     * @requires {req.body.bodyPartId} body part's ID
     *
     * @returns {db.measurements} newly created measurement with optional uploaded pic
     */
    app.post(
        '/api/measurement/add/',
        [
            authJwt.verifyToken,
            authJwt.isAthlete,
            singleUpload,
        ],
        controller.addMeasurement
    );
};
