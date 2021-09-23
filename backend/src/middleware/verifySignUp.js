// date format
const moment = require('moment');

// database models
const { db } = require('../models');
const { max_char } = require('./validators');

// Roles and user models
const ROLES = db.ROLES;
const User = db.user;

// check for email already in use
duplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).json({
                message: "Email already in use."
            });
            return;

        }
        next();
    })
}


// checks for the existence of the role
roleExists = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({
                    message: "Role does not exist"
                });
                return;
            }
        }
    }
    next();
}

validDOB = (req, res, next) => {
    const eighteenYearsAgo = moment().subtract(18, "years");
    const hundredYearsAgo = moment().subtract(100, "years");
    const birthday = moment(req.body.dob);

    if (!birthday.isValid()) {
        res.status(400).json({
            message: "Invalid DOB format."
        });
        return;
    }
    else if (!eighteenYearsAgo.isAfter(birthday) || hundredYearsAgo.isAfter(birthday)) {
        res.status(400).json({
            message: "DOB must be between 18 and 100 years"
        });
        return;
    }
    next();
}

// Checks first name for max 120 chars
maxChar_firstname = (req, res, next) => {
    max_char(req.body.firstName, 120, res, next);
}

// Checks last name for max 120 chars
maxChar_lastname = (req, res, next) => {
    max_char(req.body.lastName, 120, res, next);
}

// Checks gender for max 120 chars
maxChar_gender = (req, res, next) => {
    max_char(req.body.gender, 120, res, next);
}

// functions for backend validation
const verifySignUp = {
    duplicateEmail: duplicateEmail,
    roleExists: roleExists,
    validFirstName: maxChar_firstname,
    validLastName: maxChar_lastname,
    validGender: maxChar_gender,
    validDOB: validDOB
};

module.exports = verifySignUp;