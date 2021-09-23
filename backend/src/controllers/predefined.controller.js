const { db } = require('../models');
const { Op } = require('sequelize');

const Sequelize = require('sequelize');

const Workout = db.workout;
const Exercise = db.exercise;

// Trainer view of their athletes
exports.initialPredefinedWorkouts = async (req, res) => {

    const workouts = await Workout.findAll({
        where : {
            id : {
                [Op.in] : [1, 2, 3, 4]
            }
        },
        attributes: [
            'id',
            'name',
            'sets',
            [Sequelize.fn('COUNT', Sequelize.col('exercises.id')), 'exercisesCount']
        ],
        include : db.exercise,
        group: ['workout.id', 'exercises.id']
    }).catch(err => {
        console.log(err.message);
    })

    res.status(200).json(workouts);

};

// get all the predefined workouts
exports.getPredefinedCustomWorkouts = async (req, res) => {

    const predefinedWorkouts = await Workout.findAll({
        where: {
            [Op.and]: [
                { createdBy: req.userId },
                { predefined: true }
            ]
        },
        include: db.exercise
    })

    res.status(200).json(predefinedWorkouts)

};

exports.createPredefinedCustomWorkouts = async (req, res) => {

    const { workout, exercises } = req.body;

    const newWorkout = await Workout.create({
        name: workout,
        createdBy: req.userId,
        predefined: true
    });

    exercises.forEach(exercise => {
        Exercise.create({
            workoutId: newWorkout.id,
            name: exercise.name,
            reps: exercise.reps,
            weight: exercise.weight,
            sets: exercise.sets,
            rest: exercise.rest,
        });
    });

    res.status(201).json(workout)

};