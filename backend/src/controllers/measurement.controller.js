// sequelize operations (and, or, etc..)
const { Op } = require('sequelize');
// file service module
const fs = require('fs');
// image upload function
const { uploader } = require('../utils/image-upload.utils');
// database models
const { db } = require('../models');

// measurement model
const BodyPart = db.bodyPart;
// measurement model
const Measurement = db.measurements;
const Athlete = db.athlete;

/**
 * Get Measurements
 * ----------------
 * Gets all the measurements for a specific athlete
 */
exports.getMeasurements = async (req, res) => {

    const { bodyPartId } = req.params;

    // look for all the body parts
    const measurements = await Measurement.findAll({
        where: {
            bodyPartId: bodyPartId
        }
    });

    // return all the body parts
    res.status(200).json(measurements);
};


/**
 * Add Measurements
 * ----------------
 * Adds measurements to the body part for
 * athletes to see their progress
 */
exports.addMeasurement = async (req, res) => {

    const { bodyPartId, circumference } = req.body;

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

    // look for the requested body part
    const bodyPart = await BodyPart.findOne({
        where: {
            [Op.and] : [
                { athleteId: athlete.id },
                { id: bodyPartId }
            ]
        }
    });

    if (req.file) {

        const folder = `measurements/${bodyPart.athleteId}/${bodyPart.bodyPartName}/`

        // get the file path
        const filePath = req.file.path;

        // upload the image to cloudinary
        uploader(req, folder, function (err, result) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }

            console.log('file uploaded to Cloudinary')
            // remove file from server
            fs.unlinkSync(filePath)

            // create a new measurement entry in the database with an image
            Measurement.create({
                bodyPartId: bodyPart.id,
                circumference: circumference,
                link: result.url
            })
            .then(async measurement => {
                // update the number of images for the body part
                await bodyPart.increment('count');
                res.status(201).json(measurement);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });
        });
    }
    else {
        // create a new measurement entry in the database without an image
        const measurement = await Measurement.create({
                bodyPartId: bodyPart.id,
                circumference: circumference
            });

        // update the number of images for the body part
        await bodyPart.increment('count');
        await bodyPart.save();
        await bodyPart.reload();

        res.status(201).json(measurement);

    }
}
