// json web token library
const jwt = require('jsonwebtoken');
// encryption library
var bcrypt = require('bcryptjs');
// config
const { secretAuthKey } = require('../config/auth.config');

// database models
const { db } = require("../models");

const { getRole } = require('../utils/helper.util');

// user and role models
const User = db.user;
const Profile = db.profile;
const Athlete = db.athlete;
const Trainer = db.trainer;

// check if the email is linked with an invited request
// and update the id of the registered user
// todo maybe unhash the trainer id
async function invitedAthlete(trainerId, athlete) {
    // check for trainer
    const trainer = await Trainer.findByPk(trainerId);

    if (trainer) {
        athlete.update({
            trainerId: trainer.id
        })
    }
}


// signup function creates a new user,
// a new address, and a new goal
exports.signup = async (req, res) => {

    const { email, password, role, firstName, lastName, dob, gender, invite } = req.body;

    // Save user to Database
    const user = await User.create({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 8),
        role: getRole(role)
    });

    // get full name
    const fullName = firstName + ' ' + lastName;

    // create a trainer
    if (user.role === 'trainer') {
        await Trainer.create({
            userId: user.id,
            name: fullName
        });
    }

    // create an athlete
    if (user.role === 'athlete') {
        const athlete = Athlete.create({
            userId: user.id,
            name: fullName,
            email: user.email
        })

        // athlete is allowed to use full features
        user.active = true;
        user.save()

        // check if user was invited
        if (invite) {
            await invitedAthlete(invite, athlete)
        }
    }

    // creates a profile linked to the user id
    await Profile.create({
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
    });

    // sign in user an assign a payload in seconds
    
    const token = jwt.sign(
        { id: user.id },
        secretAuthKey,
        {
            expiresIn: 3600  // 1 hour
        });

    // finally return the user
    res.status(201).json({
        id: user.id,
        token: token
    });


}

// login function
exports.login = async (req, res) => {

    // passed variables
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const invite = req.body.inviteId ? req.body.inviteId : null

    // search for a user based on the email (unique)
    const user = await User.findOne({
        where : {
            email: email
        }
    });

    // if no user
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }

    // decrypt password
    const validPassword = bcrypt.compareSync(
        password,
        user.password
    );

    // invalid password
    if (!validPassword) {
        // 401: Unauthorized
        res.status(401).json({
            accessToken: null,
            message: "Invalid password"
        });
        return;
    }

    // sign in user an assign a payload in seconds
    const token = jwt.sign(
        
        {id: user.id},
        secretAuthKey,
        {
            expiresIn: 3600  // 1 hour
        });

    

    // check if the user was invited by a trainer
    if (invite) {
        Athlete.findOne({
            where: {
                userId : user.id
            }
        })
        .then(athlete => {
            // add trainer id to athlete
            invitedAthlete(invite, athlete)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
    }

    // return the user information
    // 200 : OK
    res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken: token
    });
}