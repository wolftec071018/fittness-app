// sequelize operations (and, or, etc..)
const { Op } = require('sequelize');
// database models
const { db } = require('../models');
// measurement model
const BodyPart = db.bodyPart;
const Athlete = db.athlete;

/**
 * Get Measurements
 * ----------------
 * Gets all the measurements for a specific athlete
 */
exports.getBodyParts = async (req, res) => {

    // athlete id
    const athlete = await Athlete.findOne({
        where : {
            userId: req.userId
        }
    });

    if (!athlete) {
        res.status(401).json({
            message: "Only athletes allowed"
        });
        return;
    }

    // look for all the body parts
    const bodyParts = await BodyPart.findAll({
        where: {
            athleteId: athlete.id
        },
        include: [
            {
                model: db.measurements,
                attributes: ['circumference', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ]
            }
        ]
    });

    // return all the body parts
    res.status(200).json(bodyParts);

};

exports.getByName = async (req, res) => {

    // athlete id
    const { name } = req.params;

    const athlete = await Athlete.findOne({
        where : {
            userId: req.userId
        }
    });

    if (!athlete) {
        res.status(401).json({
            message: "Only athletes allowed"
        });
        return;
    }

    // look for all the body parts
    const bodyPart = await BodyPart.findOne({
        where: {
            [Op.and] : [
                { athleteId: athlete.id },
                { bodyPartName: name }
            ]
        },
        include: [
            {
                model: db.measurements,
                attributes: ['circumference', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 1
            }
        ]
    });

    // return all the body parts
    res.status(200).json(bodyPart);

};


exports.getByNameAndSide = async (req, res) => {

    // athlete id
    const { name, side } = req.params;

    const athlete = await Athlete.findOne({
        where : {
            userId: req.userId
        }
    });

    if (!athlete) {
        res.status(401).json({
            message: "Only athletes allowed"
        });
        return;
    }

    // look for all the body parts
    const bodyPart = await BodyPart.findOne({
        where: {
            [Op.and] : [
                { athleteId: athlete.id },
                { bodyPartName: name },
                { side: side }
            ]
        },
        include: [
            {
                model: db.measurements,
                attributes: ['circumference', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 1
            }
        ]
    });

    // return all the body parts
    res.status(200).json(bodyPart);

};

/**
 * Create Body Parts
 * --------------
 * Creates a specific body part
 */
exports.createBodyPart = async (req, res) => {

    // body part
    const { bodyPart, side } = req.body;

    const athlete = await Athlete.findOne({
        where : {
            userId: req.userId
        }
    });

    if (!athlete) {
        res.status(401).json({
            message: "Only athletes allowed"
        });
        return;
    }

    // look for all the body parts
    const [newBodyPart, created] = await BodyPart.findOrCreate({
        where: {
            athleteId: athlete.id,
            bodyPartName: bodyPart,
            side: side
        }
    });

    if (created) {
        res.status(201).json(newBodyPart);
    }
    else {
        res.status(200).json(newBodyPart);
    }
}

/**
 * Delete Body Part
 * ----------------
 * deletes a body part linked to a specific Athlete
 */
exports.deleteBodyPart = async  (req, res) => {

    // athlete id
    const { bodyPartId } = req.body;

    const athlete = await Athlete.findOne({
        where : {
            userId: req.userId
        }
    });

    if (!athlete) {
        res.status(401).json({
            message: "Only athletes allowed"
        });
        return;
    }

    const bodyPart = await BodyPart.findOne({
        where: {
            [Op.and] : [
                { athleteId: athlete.id },
                { id: bodyPartId }
            ]
        }
    });

    if (!bodyPart) {
        res.status(404).json({
            message: "Not Found"
        });
        return;
    }

    await bodyPart.destroy();

    res.status(200).json({
        message: "Body part deleted"
    })
};