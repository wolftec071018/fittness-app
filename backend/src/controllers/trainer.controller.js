const { db } = require('../models');
// database operations (and, or,..)
const { Op } = require("sequelize");

const Trainer =db.trainer;
// Athlete model
const Athlete = db.athlete;
// workout model
const Workout = db.workout;

// Trainer view of their athletes
exports.trainerBoard = async (req, res) => {

    // Look for the trainer profile
    const trainer = await Trainer.findOne({
        where : {
            userId : req.userId
        }
    });

    // search for all the trainer athletes
    const athletes = await Athlete.findAll({
        where : {
            trainerId : trainer.id
        }
    });

    res.status(200).json(athletes);

}

// Detail view of a registered athlete
exports.trainerAthleteBoard = async (req, res) => {

    const athleteId = req.body.athleteId;

    // Look for the trainer profile
    const trainer = await Trainer.findOne({
        where : {
            userId : req.userId
        }
    });

    // search for the specific athlete
    const athlete = await Athlete.findOne({
        where : {
            [Op.and] : [
                { id: athleteId },
                { trainerId: trainer.id }
            ]
        },
        include: db.workout
    });

    // if invalid athlete id
    if (!athlete) {
        res.status(404).json({
            message: "Athlete not found"
        });
        return;
    }

    // return the specific athlete
    res.status(200).json(athlete);
}

// workouts of an specific athlete
exports.trainerAthleteWorkoutBoard = async (req, res) => {

    var offset = req.body.offset ? req.body.offset : 0;
    const athleteId = req.body.athleteId;

    // Look for the trainer profile
    const trainer = await Trainer.findOne({
        where : {
            userId : req.userId
        }
    });

    // search for the specific athlete
    const athlete = await Athlete.findOne({
        where: {
            [Op.and]: [
                { id: athleteId },
                { trainerId: trainer.id }
            ]
        },
    });

    // if no athlete
    if (!athlete) {
        res.status(404).json({
            message: "Athlete not found"
        });
        return;
    }

    // find all the workouts associated with the athlete
    const workouts = await Workout.findAll({
        where : {
            athleteId : athlete.id
        },
        limit : 10,
        offset : offset
    });

    // return all the workouts with a limit of 10
    res.status(200).json(workouts);

}