/**
 * Exercise Routes
 * ---------------
 * Exercises from a specific workout from a specific athlete
 *
 * @getExercise : [token required] retrieves the exercise from a specific :workoutId from a specific :athleteId
 * @createExercise : [token required] creates an exercise for a specific :workoutId from a specific :athleteId
 * @updateExercise : [token required] updates an exercise for a specific :workoutId from a specific :athleteId
 * @deleteExercise : [token required] deletes an exercise for a specific :workoutId from a specific :athleteId
 */

// controller for exercise data
const controller = require("../controllers/exercise.controller");
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
     * Athlete Exercise by ID
     * ----------------------
     * returns a single exercise based on req.params
     *
     * @param {number} athlete Id
     * @param {number} workout Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.exercise} exercise
     */
    app.get(
        '/api/workout/:workoutId/exercise/:exerciseId',
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.getExercise
    );

    /**
     * Athlete Create Exercise
     * ----------------------
     * creates a new exercise linked to the workout passed in req.body
     *
     * @param {number} athlete Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.exercise} exercise
     */
    app.post(
        '/api/exercise/create/',
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.createExercise
    );

    /**
     * Athlete Update Exercise
     * -----------------------
     * Updates an exercise based on the req.body. Athletes can mark the workout as
     * DONE.
     *
     * @param {number} athlete Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.exercise} update exercise
     */
    app.put(
        '/api/exercise/update/',
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.updateExercise
    );

    /**
     * Allows the Athlete to update the exercise as completed/done.
     */
    app.post(
        '/api/exercise/done/',
        [
            authJwt.verifyToken,
            authJwt.isAthlete
        ],
        controller.exerciseDone
    );

    /**
     * Athlete Delete Exercise
     * -----------------------
     * Deletes an exercise based on the req.body
     *
     * @param {number} athlete Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.exercise} deleted exercise
     */
    app.delete(
        '/api/exercise/delete/',
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.deleteExercise
    );
};