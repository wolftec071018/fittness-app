/**
 * Workout Routes
 * --------------
 * Workouts based on users id (:userId)
 *
 * @getWorkouts : [token required] returns a list of workouts related to the :athleteId
 * @getWorkoutByID : [token required] returns :id workout related to the :athleteId
 * @createWorkout : [token required] creates a new workout related to the :athleteID
 * @deleteWorkout : [token required] deletes :id workout based on the :athleteId
 */

// controller for workout list database
const controller = require("../controllers/workout.controller");
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
     * Athlete get Workouts
     * --------------------
     * LIMIT = 10
     * returns the last {{ LIMIT }} workouts the athletes
     * or trainer have created based on date
     *
     * @param {number} athlete Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {Array} workouts
     */
    app.get(
        "/api/workouts/all/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.getWorkouts
    );

    /**
     * Get workouts that were created by the logged in user
     */
    app.get(
        "/api/workouts/created/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.getCreatedByWorkouts
    );

    /**
     * get workouts created only by the athlete if logged in
     */
    app.get(
        "/api/workouts/created/athlete/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.getCreatedByAthleteWorkouts
    );

    /**
     * Athlete Workout by ID
     * --------------------
     * returns a single workout based on req.params
     *
     * @param {number} athlete Id
     * @param {number} workout Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.workout} workout
     */
    app.get(
        "/api/workouts/:workoutId/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.getWorkoutByID
    );

    /**
     * Athlete Create Workout
     * ----------------------
     * returns a single workout based on req.params
     *
     * @param {number} athlete Id
     * @param {number} workout Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.workout} workout
     */
    app.post(
        "/api/workouts/create/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.createWorkout
    );

    /**
     * Athlete Delete Workout
     * ---------------------
     * Deletes a single workout based on the req.params
     *
     * @param {number} athlete Id
     * @param {number} workout Id
     *
     * @requires {authJwt.verifyToken} the user is authenticated and sets the userId for the request
     * @requires {authJwt.isAthleteOrTrainer} only allows authenticated users that are either the athlete or the assigned trainer
     *                              to access the data
     *
     * @returns {db.workout} workout
     */
    app.delete(
        "/api/workouts/delete/",
        [
            authJwt.verifyToken,
            authJwt.isAthleteOrTrainer
        ],
        controller.deleteWorkout
    );
};