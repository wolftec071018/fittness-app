// Operational function
const { Op } = require("sequelize");
// geo locator
const NodeGeocoder = require('node-geocoder');
// date format
const moment = require('moment');
// geo distance in haversine
const geodist = require('geodist');
const { getRole } = require("../utils/helper.util");
// google config
const { googleGeocoderOptions } = require('../config/google-geocoder.config');

// database
const { db } = require('../models');

// database models needed
const User = db.user;
const Profile = db.profile;
const Workout = db.workout;
const Address = db.address;
const Trainer = db.trainer;
const Athlete = db.athlete;

// Search only for trainers that have a public profile
exports.searchTrainer = async (req, res) => {

    // city to look into, // offset of users
    const { city, offset } = req.body;

    // max amount of objects to return
    const limit = 20

    const trainers = []

    const foundTrainers = await User.findAll({
        where: {
            public: true,
            role: getRole(1)
        },
        attributes: ['id', 'active', 'createdAt'],
        include: [
            {
                model: Address,
                attributes: ['city'],
                where: {
                    city: city
                }
            },
            {
                model: Profile,
                attributes: ['gender', 'dob', 'image']
            },
            {
                model: Trainer,
                attributes: ['name']
            }
        ],
        limit: limit,
        offset: offset
    });

    foundTrainers.forEach(tr => {
        let tmp = {}
        tmp.id = tr.id;
        tmp.name = tr.trainer.name;
        tmp.gender = tr.profile.gender;
        tmp.age = moment().diff(tr.profile.dob, 'years');
        tmp.city = tr.address.city;
        tmp.active = tr.active;
        tmp.image = tr.profile.image;
        tmp.since = tr.createdAt.toDateString();

        trainers.push(tmp);
    })

    res.status(200).json(trainers)
}

// Search only for athletes that have
// a public profile
exports.searchAthlete = async (req, res) => {

    const { city, gender, age, offset } = req.body;

    // max amount of objects to return
    const limit = 20

    var queryParams = []

    // check for city
    if (city) {
        queryParams.push({
            model: Address,
            attributes: ['city'],
            where: {
                city: city
            }
        });
    }
    else{
        queryParams.push({
            model: Address,
            attributes: ['city']
        });
    }

    // check for gender
    if (gender) {
        queryParams.push({
            model: Profile,
            attributes: ['gender', 'dob', 'image'],
            where: {
                gender: gender
            }
        });
    }
    else {
        queryParams.push({
            model: Profile,
            attributes: ['gender', 'dob', 'image']
        });
    }

    queryParams.push({
        model: Athlete,
        attributes: ['name']
    });

    const users = await User.findAll({
        where: {
            public: true,
            role: getRole(0)
        },
        attributes: ['id', 'active', 'createdAt'],
        include: queryParams,
        limit: limit,
        offset: offset
    });


    var usersToShow = []

    // check for age
    if (age) {
        for(let i = 0; i < users.length; i++) {
            const userAge = moment().diff(users[i].profile.dob, 'years')
            if (age === userAge) {
                usersToShow.push(users[i]);
            }
        }
    }
    else {
        usersToShow = users;
    }

    const athletes = [];

    usersToShow.forEach(tr => {
        let tmp = {}
        tmp.id = tr.id;
        tmp.name = tr.athlete.name;
        tmp.gender = tr.profile.gender;
        tmp.age = moment().diff(tr.profile.dob, 'years');
        tmp.city = tr.address.city;
        tmp.active = tr.active;
        tmp.image = tr.profile.image;
        tmp.since = tr.createdAt.toDateString();

        athletes.push(tmp);
    })

    res.status(200).json(athletes);
}

// Search for trainers close to the user
exports.searchByDistance = async (req, res) => {

    // for testing only
    const { street, city, zipcode } = req.body;
    const limit = 10;

    // geocoder config
    const geocoder = NodeGeocoder(googleGeocoderOptions);

    // get address of logged in user
    const athleteAddress = await Address.findOne({
        where: {
            userId: req.userId
        },
        attributes: ['id', 'street', 'city', 'zipcode']
    });

    let athleteLoc = {};

    // if we haven't saved the lat and lon in the db, updated now
    if (!athleteAddress.lat || !athleteAddress.lon) {
        const location = await geocoder.geocode({
            address: athleteAddress.street,
            city: athleteAddress.city,
            zipcode: athleteAddress.zipcode
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
        // add the lat and lon to the address db
        athleteAddress.lat = location[0].latitude;
        athleteAddress.lon = location[0].longitude;
        athleteAddress.save();

        // setup location to get distance from
        athleteLoc = {
            lat: location[0].latitude,
            lon: location[0].longitude
        }
    }
    else {
        // setup location to get distance from
        athleteLoc = {
            lat: athleteAddress.lat,
            lon: athleteAddress.lon
        }
    }

    // Find all trainers close by
    const trainers = await User.findAll({
        where: {
            [Op.and] : [
                { public: true },
                { role: 'trainer' }
            ]
        },
        attributes: ['id', 'active'],  // only show active status
        include: [
            {
                model: Address,
                where: {
                    city: athleteAddress.city  // check for trainers within the city
                },
                attributes: ['street', 'city', 'zipcode']
            },
            {
                model: Trainer,
                attributes: ['id', 'name', 'specialty']
            }
        ],
        limit: limit
    });

    // create a list for found trainers
    const closeByTrainers = [];

    // iterate through found trainers and calculate
    // the distance between them and the user
    for (let i = 0; i < trainers.length; i++) {
        const info = trainers[i];

        const location = await geocoder.geocode({
            address: info.address.street,
            city: info.address.city,
            zipcode: info.address.zipcode
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });

        // trainer location in lat, lon
        const trainerLoc = {
            lat: location[0].latitude,
            lon: location[0].longitude
        }

        // miles or mi, kilometers or km, feet, yards, meters
        // exact allows for exact distance in decimals
        var dist = geodist(athleteLoc, trainerLoc, {
            unit: 'mi',
            exact: true
        });

        // only show up to 2 decimal places
        dist = dist.toFixed(2);

        // add the trainer and distance to the list
        closeByTrainers.push({
            trainerId: info.trainer.id,
            trainer: info.trainer.name,
            specialty: info.trainer.specialty,
            distance: `${dist} miles`
        });
    }

    // return up to 10 trainers that are close by
    res.status(200).json(closeByTrainers);
}

// view user profile based on user id
exports.viewProfile = async (req, res) => {

    // passed user id
    const { viewId } = req.params;
    // max amount of workouts to show
    const limit = 3;

    const user = await User.findOne({
        where: {
            [Op.and] : [
                { id: viewId },
                { public: true }
            ]
        },
        attributes: ['active', 'email', 'role'],
        include: [
            {
                model: db.profile,
                attributes: ['gender', 'image']
            },
            {
                model: db.goal,
                attributes: ['goalType', 'currentWeight', 'goalWeight', 'height']
            },
        ]
    });

    // if invalid user id
    if(!user) {
        res.status(404).json({
            message: "No user found"
        })
        return;
    }

    const viewUser = user.toJSON();

    // check if user is either trainer or athlete
    if (viewUser.role === 'trainer') {
        viewUser.trainer = await Trainer.findOne({
            where: {
                userId: userToViewId
            }
        });
    }
    else if (viewUser.role === 'athlete') {
        viewUser.athlete = await Athlete.findOne({
            where: {
                userId: userToViewId
            },
            attributes: ['id', 'name']
        });

        // get 3 workouts max
        viewUser.workouts = await Workout.findAll({
            where: {
                athleteId: viewUser.athlete.id
            },
            limit: limit
        });
    }

    // return all the possible information
    // to display
    res.status(200).json(viewUser);
}