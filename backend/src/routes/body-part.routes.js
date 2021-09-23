/**
 * BodyPart Routes
 * --------------
 * Body Parts based on athlete's id (:athleteId)
 */

// controller for body part database
const controller = require("../controllers/body-part.controller");
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
     * Get All the athletes body parts
     *
     * @requires {athleteId} the athlete's Id
     *
     * @returns {Array<Object>} body parts
     */
    app.get(
        "/api/progress/all/",
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.getBodyParts
    );


    app.get(
        "/api/progress/:name/",
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.getByName
    );


    app.get(
        "/api/progress/:name/:side/",
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.getByNameAndSide
    );

    /**
     * Creates a new Body Part
     *
     * @requires {req.body.bodyPart} body part name
     * @requires {req.params.athleteId} athlete's ID
     *
     * @returns {db.bodyPart} new body part with count 0
     */
    app.post(
        '/api/progress/create/',
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.createBodyPart
    );

    /**
     * Delete a body part
     *
     * @requires {req.body.bodyPartId} body part id
     * @requires {req.params.athleteId} athlete's id
     *
     * @returns {db.bodyPart} deleted body part
     */
    app.delete(
        '/api/progress/delete/',
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.deleteBodyPart
    )
};
