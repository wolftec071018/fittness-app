// json web token encryption library
const jwt = require('jsonwebtoken');
// secret key
const config = require('../config/auth.config');

// database
const { db } = require("../models");

// user model
const User = db.user;
// athlete model
const Athlete = db.athlete;
const Trainer = db.trainer;

// checks to see if token is provided
verifyToken = function (req, res, next) {
    // get token from headers
    let token = req.headers["x-access-token"];

    // return error if no token was passed
    if(!token) {
        // 403 : Forbidden
        res.status(403).json({
            message : "No token provided"
        });
        return;
    }

    // verify the token based on the secret key
    jwt.verify(token, config.secretAuthKey, function (err, decoded) {
        if (err) {
            // 401 : Unauthorized
            res.status(401).json({
                message : "Unauthorized"
            });
            return;
        }
        req.userId = decoded.id;
        next();
    });
};

// check if the user is admin
isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then((user) => {
            if(user.role === 'admin') {
                next();
                return;
            }

            res.status(403).json({
                message: "Admin Role required"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
};

// only allows access to the athletes
isAthlete = (req, res, next) => {
    Athlete.findOne({
        where: {
            userId: req.userId
        }
    })
    .then(athlete => {
        if(athlete.userId) {
            next();
            return;
        }

        // if the request.user is not the owner or trainer
        // of the requested data
        res.status(401).json({
            message: "Unauthorized"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

// check if the user is a trainer
isTrainer = (req, res, next) => {
    User.findByPk(req.userId)
        .then((user) => {
            if(user.role === 'trainer') {
                next();
                return;
            }

            res.status(403).json({
                message: "Trainer Role required"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
};

// allows the view of workouts only if they are the trainer or athlete
isAthleteOrTrainer = async (req, res, next) => {

    const athlete = await Athlete.findOne({
        where: {
            userId : req.userId
        }
    });

    const trainer = await Trainer.findOne({
        where: {
            userId : req.userId
        }
    });

    if (athlete || trainer) {
        // only the athlete or the trainer are
        // allowed to access the athletes workout data
        next();
        return;
    }

    // if the request.user is not the owner or trainer
    // of the requested data
    res.status(401).json({
        message: "Unauthorized"
    });
}

// auth header token
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTrainer: isTrainer,
    isAthleteOrTrainer: isAthleteOrTrainer,
    isAthlete: isAthlete
};

module.exports = authJwt;