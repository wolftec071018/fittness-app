const { Op } = require("sequelize");
// database models
const { db } = require("../models");
// helper function
const { capitalize } = require("../utils/helper.util");

// Exercise model
const Exercise = db.exercise;
// Workout model
const Workout = db.workout;

/**
 * getExercise
 * -----------
 * returns a specific exercise from a specific workout
 * based on the req.body
 *
 * @requires {req.body} workoutId
 * @requires {req.body} exerciseId
 *
 * @returns {Exercise} exercise
 */
exports.getExercise = async (req, res) => {

    // get the exercise id and workout id
    const { exerciseId, workoutId } = req.params;

    const exercise = await Exercise.findOne({
        where: {
            [Op.and]: [
                { workoutId: workoutId },
                { id: exerciseId }
            ]
        }
    });

    if (!exercise) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    // return the exercise found
    res.status(200).json(exercise);
};

/**
 * createExercise
 * --------------
 * creates a new exercise linked to a specific workout
 * based on the req, and sets the exerciseDone as FALSE
 *
 * @requires {req.params} athleteId
 * @requires {req.body} workoutId
 * @requires {req.body} exerciseName
 * @requires {req.body} description
 * @requires {req.body} reps
 * @requires {req.body} weight
 *
 * @returns {Exercise} exercise
 */
exports.createExercise = async (req, res) => {

    const { workoutId, exerciseName, description, reps, weight, units } = req.body;

    // look for the workout
    const workout = await Workout.findOne({
        where: {
            id: workoutId
        }
    })

    if (!workout) {
        // if no workout was found
        res.status(404).json({
            message: "Workout Not Found"
        });
        return;
    }

    // create the new exercise
    const exercise = await Exercise.create({
        workoutId: workout.id,
        name: exerciseName,
        description: capitalize(description),
        reps: reps,
        weight: weight,
        units: units
    });

    res.status(201).json(exercise);

};

/**
 * updateExercise
 * --------------
 * updates an exercise linked to a specific workout
 * based on the req
 *
 * @requires {req.body} workoutId
 * @requires {req.body} exerciseName
 * @requires {req.body} description
 * @requires {req.body} reps
 * @requires {req.body} weight
 * @requires {req.body} exerciseDone
 *
 * @returns {Exercise} updated exercise
 */
exports.updateExercise = async (req, res) => {

    const { exerciseId, workoutId, exerciseName, description, reps, units, weight } = req.body;

    // looks for a specific exercise
    const exercise = await Exercise.findOne({
        where: {
            [Op.and] : [
                { workoutId: workoutId },
                { id: exerciseId }
            ]
        }
    });

    // if no exercise was found
    if (!exercise) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    // update exercise
    exercise.name = exerciseName.toLowerCase();
    exercise.description = capitalize(description);
    exercise.reps = reps;
    exercise.weight = weight;
    exercise.units = units;

    await exercise.save();
    await exercise.reload();

    res.status(200).json(exercise);

};

// update the exercise as completed
exports.exerciseDone = async (req, res) => {

    // get the workout id and exercise id
    const { workoutId, exerciseId } = req.body;

    const exercise = await Exercise.findOne({
        where: {
            [Op.and]: [
                { workoutId: workoutId },
                { id: exerciseId }
            ]
        }
    });


    if (!exercise) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    // update exercise
    exercise.done = true;
    // save the exercise
    await exercise.save();
    await exercise.reload();

    res.status(200).json(exercise)
}

/**
 * deleteExercise
 * --------------
 * destroys a specific exercise from a specific workout
 * based on the req.body
 *
 * @requires {req.body} workoutId
 * @requires {req.body} exerciseId
 *
 * @returns {Exercise} exercise
 */
exports.deleteExercise = async (req, res) => {

    const { workoutId, exerciseId } = req.body;

    // look for the exercise
    const exercise = await Exercise.findOne({
        where: {
            [Op.and]:[
                { workoutId: workoutId },
                { id: exerciseId }
            ]
        }
    });

    // if not found
    if (!exercise) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }
    // delete exercise
    await exercise.destroy();

    res.status(200).json({
        message: "Exercise deleted"
    });
};