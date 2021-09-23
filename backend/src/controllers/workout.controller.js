// sequelize operations (and, or, etc..)
const { Op } = require('sequelize');

// database models
const { db } = require('../models');
// email sender
const { sendEmail } = require('../utils/email.util');

// workout model
const Workout = db.workout;
// trainer model
const Athlete = db.athlete;

// pagination limit
const LIMIT = 10;

/**
 * getWorkouts
 * -----------
 * returns all the workouts for a specific Athlete
 * based on the req.params
 *
 * @requires {req.params} athleteId
 *
 * @returns {Array<Workout>} workouts
 */
exports.getWorkouts = async (req, res) => {

    const athlete = await Athlete.findOne({
        where: {
            userId: req.userId
        }
    });

    // find the last 10 workouts
    const workouts = await Workout.findAll({
        where: {
            athleteId: athlete.id
        },
        limit: LIMIT,
        order : [
            ['createdAt', 'DESC']
        ]
    });

    res.status(200).json(workouts);

};


exports.getCreatedByWorkouts = async (req, res) => {

    // find the last 10 workouts
    const workouts = await Workout.findAll({
        where: {
            createdBy: req.userId
        },
        limit: LIMIT,
        order : [
            ['createdAt', 'DESC']
        ]
    });

    res.status(200).json(workouts);

};

exports.getCreatedByAthleteWorkouts = async (req, res) => {

    // athlete id
    const athlete = await Athlete.findOne({
        where: {
            userId: req.userId
        }
    });

    // find the last 10 workouts
    const workouts = await Workout.findAll({
        where: {
            [Op.and] : [
                { athleteId: athlete.id },
                { createdBy: req.userId }
            ]
        },
        limit: LIMIT,
        order : [
            ['createdAt', 'DESC']
        ]
    });

    res.status(200).json(workouts);

};


/**
 * getWorkoutById
 * --------------
 * returns a specific workout from a specific Athlete
 * based on the req.params
 *
 * @requires {req.params} athleteId
 * @requires {req.body} workoutId
 *
 * @returns {Workout} workout
 */
exports.getWorkoutByID = async (req, res) => {

    // athlete id and workout id from body
    const { workoutId } = req.params;

    const workout = await Workout.findOne({
        where: {
            id: workoutId
        },
        include: db.exercise
    })

    // if there is no workout with that id
    if (!workout) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    // return the found workout
    res.status(200).json(workout);

};

/**
 * createWorkout
 * --------------
 * creates a new workout linked to a specific Athlete
 * based on the req, and sets the created field to the authenticated userId
 *
 * @requires {req.params} athleteId
 * @requires {authJwt.verifyToken} userId
 * @requires {req.body} workoutName
 * @requires {req.body} date
 *
 * @returns {Workout} workout
 */
exports.createWorkout = async (req, res) => {

    // get all needed data from body
    const { athleteId, workoutName, sets, startDate, endDate, restPeriod } = req.body;

    // create the workout
    const workout = await Workout.create({
        athleteId: athleteId,
        createdBy: req.userId,  // can be created by either athlete or trainer
        name: workoutName,
        startDate: startDate,
        endDate: endDate,
        sets: sets,
        rest: restPeriod
    }).catch(err => {
        console.log(err.message);

    })

    // check to see if the trainer was the one that created the workout
    const athlete = await Athlete.findByPk(athleteId);

    if (athlete) {
        if (athlete.userId !== req.userId) {
            // create subject line for email
            let subject = 'A new Workout has been added to your profile';

            // builds email with its details
            let emailBuilder = {
                title: "New Workout!",
                intro: [
                    "You have received this email because your ",
                    "trainer have posted a new workout for you."
                ],
                instructions: 'To get started with your workout please login',
                btnText: 'Login',
                link: "http://localhost:3000/login/"
            };

            // send the email and verify if done
            let wasEmailSent = sendEmail(athlete.email, subject, emailBuilder);
            // in the future on error notify admin
            console.log("Email sent? ", wasEmailSent? 'Yes' : 'No');
        }
    }

    // return the newly created workout
    res.status(200).json(workout)

};

/**
 * deleteWorkout
 * --------------
 * destroys a workout linked to a specific Athlete
 * based on the req
 *
 * @requires {req.params} athleteId
 * @requires {req.body} workoutId
 *
 * @returns {Workout} workout
 */
exports.deleteWorkout = async (req, res) => {

    // athlete id and workout id from body
    const { athleteId, workoutId } = req.body;

    const workout = await Workout.findOne({
        where: {
            [Op.and] : [
                { athleteId: athleteId },
                { id: workoutId }
            ]
        }
    })

    if (!workout) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    if (workout.createdBy === req.userId) {
        await workout.destroy();
    }
    else {
        workout.createdBy = null;
        await workout.save();
    }

    // return the deleted workout
    res.status(200).json({
        message: "Workout Deleted"
    })

};