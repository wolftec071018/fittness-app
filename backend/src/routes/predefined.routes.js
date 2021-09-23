
// controller for body part database
const controller = require("../controllers/predefined.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // get initial predefined workouts
    app.get(
        '/api/predefined/workouts/initial/',
        [authJwt.verifyToken],
        controller.initialPredefinedWorkouts
    );

    // get custom predefined workouts
    app.get(
        '/api/predefined/workouts/custom/',
        [authJwt.verifyToken],
        controller.getPredefinedCustomWorkouts
    );

    // creates custom predefined workouts
    app.post(
        '/api/predefined/workouts/create/',
        [authJwt.verifyToken],
        controller.createPredefinedCustomWorkouts
    );
}