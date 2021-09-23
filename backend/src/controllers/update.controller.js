// database
const { db } = require('../models');
// util function to get all objectives
const { getObjective } = require('../utils/helper.util');
// encryption library
const bcrypt = require('bcryptjs');
// date formatter
const moment = require('moment');
// file service
const fs = require("fs");
// helper function
const { capitalize } = require("../utils/helper.util");
// image upload function
const { uploader } = require('../utils/image-upload.utils');


// models to be updated
const Goal = db.goal;
const Address = db.address;
const User = db.user;
const Profile = db.profile;

// salt for hashing the password
const SALT = 8;

/**
 * Updates the public view of the current user
 * @returns update profile
 */
exports.updateView = async (req, res) => {

    const { setPublicProfile } = req.body;

    // get the viewing user id
    const user = await User.findByPk(req.userId);

    // change the view at the user level
    user.public = setPublicProfile;
    await user.save();
    await user.reload();

    res.status(200).json(user);
}


/**
 * Update profile
 */
exports.updateProfile = async (req, res) => {

    // passed variables
    const { firstName, lastName, dob, gender } = req.body;

    const [profile, created] = await Profile.findOrCreate({
        where: {
            userId: req.userId
        }
    });

    profile.firstName = capitalize(firstName);
    profile.lastName = capitalize(lastName);
    profile.dob = moment(dob);
    profile.gender = gender.toLowerCase();

    await profile.save();
    await profile.reload();

    if (created) {
        res.status(201).json(profile);
    }
    else {
        res.status(200).json(profile);
    }
}

// update the goals of user
exports.updateGoal = async (req, res) => {

    // variables passed from body
    const { currentWeight, goalWeight, height, goalType } = req.body;

    // finds or creates a model based on user id
    const [goal, created] = await Goal.findOrCreate({
        where : {
            userId : req.userId
        }
    }).catch(err => res.status(500).json({ message: err.message }));

    // get the type of objective
    goal.goalType =  getObjective(goalType);
    goal.currentWeight = currentWeight;
    goal.goalWeight = goalWeight;
    goal.height = height;

    await goal.save();
    await goal.reload();

    if (created) {
        res.status(201).json(goal);
    }
    else {
        res.status(200).json(goal);
    }
}

// update the address of the user
exports.updateAddress = async (req, res) => {

    // variables passed from body
    const { street, city, state, zipcode } = req.body;

    const [address, created] = await Address.findOrCreate({
        where : {
            userId : req.userId
        }
    }).catch(err => res.status(500).json({ message: err.message }));

    address.street = street.toLowerCase();
    address.city = city.toLowerCase();
    address.state = state.toUpperCase();
    address.zipcode = zipcode;

    await address.save();
    await address.reload();

    if (created) {
        res.status(201).json(address);
    }
    else {
        res.status(200).json(address);
    }
}

// update the login info for the user of the user
exports.updatePassword = async (req, res) => {

    // get the user
    const user = await User.findByPk(req.userId);

    user.password = bcrypt.hashSync(req.body.password, SALT);

    await user.save();

    res.status(200).json({
        message: "Password updated"
    });
}

// update the the login Email
exports.updateEmail= async (req, res) => {

    const user = await User.findByPk(req.userId);

    if(req.body.email && req.body.email !== user.email) {

        user.email = req.body.email.toLowerCase();

        await user.save();
        await user.reload();

        res.status(200).json(user);
    }
    else {
        res.status(400).json({
            message: "No email or duplicate email found"
        });
    }
}


// updates the profile image of a logged in user
exports.updateProfileImage = async (req, res) => {

    // search db for user's profile
    const profile = await Profile.findOne({
        where : {
            userId : req.userId
        }
    });

    if (!profile) {
        res.status(404).json({
            message: "No profile exists for the user"
        });
        return;
    }

    if(!req.file) {
        res.status(400).json({
            message: "No image passed"
        });
        return;
    }

    // get the file path
    const filePath = req.file.path;

    const folder = `profile/${profile.id}/avatar/`

    // upload the image to cloudinary
    uploader(req, folder, async function (err, result) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }

        console.log('file uploaded to Cloudinary')
        // remove file from server
        fs.unlinkSync(filePath)

        profile.image = result.url;
        await profile.save();

        res.status(200).json({
            message: "Image uploaded successfully"
        });
    });
}