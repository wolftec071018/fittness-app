// trainer controller
const controller = require('../controllers/trainer.controller');
// middleware user authenticator
const authJwt = require("../middleware/authJwt");

// Trainer views
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Trainer access
     * --------------
     * Endpoint that allows the trainers to see all their
     * currently registered Athletes.
     *
     * @param {number} userId
     *
     * @returns {Array<Object>} athletes
     */
    app.get(
        "/api/trainer/",
        [
            authJwt.verifyToken,
            authJwt.isTrainer
        ],
        controller.trainerBoard
    );

    /**
     * TODO : Check with frontend to see the
     * TODO : data they need, might just return
     * TODO : the athlete view
     * Trainer detail view
     * -------------------
     * Allows the trainer to view a specific Athlete
     *
     * @returns {Object} Profile
     */
    app.get(
        "/api/trainer/athlete/view",
        [
            authJwt.verifyToken,
            authJwt.isTrainer
        ],
        controller.trainerAthleteBoard
    );
}