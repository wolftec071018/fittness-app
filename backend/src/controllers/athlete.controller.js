// General database
const { db } = require('../models');
// user model for finding the athlete's profile
const Athlete = db.athlete;

/**
 * Athlete Board
 * -------------
 * Athlete view of their profile
 */
exports.athleteBoard = async (req, res) => {
    // Look for athlete based on passed
    // athleteId and decoded id from AuthJwt
    const athlete = await Athlete.findOne({
        where: {
            userId: req.userId
        },
        attributes: ["id", "name", "public", "trainerId"],
        include: db.workout  // include all of the athlete's workouts
    });

    // if no athlete was found
    if(!athlete) {
        res.status(404).json({
            message: "User not Found"
        });
        return;
    }

    // return the found athlete
    res.status(200).json(athlete);

};