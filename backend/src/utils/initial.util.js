const { db } = require('../models');
// express module used for starting a server
const moment = require("moment");
// encryption library
const bcrypt = require('bcryptjs')

const Exercise = db.exercise;
const Workout = db.workout;

// models
const User = db.user;
const Trainer = db.trainer;
const Athlete = db.athlete;

// function to find roles
const { getRole, getObjective } = require("./helper.util");

preWorkouts = [
    {
        'name' : 'Bear',
        'sets' : 5,
        'rest' : null,
        'data': [
            {
                'name': 'run',
                'reps': 400,
                'weight': null,
                'units': 'm',
                'description': 'Run 400 meters'
            },
            {
                'name': 'bench press',
                'reps': 15,
                'weight': 155,
                'units': 'kg',
                'description': 'Regular bench press'
            },
            {
                'name': 'grasshoppers',
                'reps': 15,
                'weight': null,
                'units': null,
                'description': 'Cross-legged mountain climbers'
            }
        ],
    },
    {
        'name' : 'Chupacabra',
        'sets' : 5,
        'rest' : null,
        'data' : [
            {
                'name': 'pull ups',
                'reps': 10,
                'weight': null,
                'units': null,
                'description': 'Strict pull ups'
            },
            {
                'name': 'dips',
                'reps': 15,
                'weight': null,
                'units': null,
                'description': 'Strict dips'
            },
            {
                'name': 'sit ups',
                'reps': 20,
                'weight': null,
                'units': null,
                'description': 'Knees together sit ups'
            }
        ],
    },
    {
        'name' : 'Shark',
        'sets' : 3,
        'rest' : null,
        'data' : [
            {
                'name': 'run',
                'reps': 400,
                'weight': null,
                'units': 'm',
                'description': 'Run 400 meters'
            },
            {
                'name': 'power cleans',
                'reps': 15,
                'weight': 95,
                'units': 'kg',
                'description': 'Power cleans'
            },
            {
                'name': 'burpees',
                'reps': 15,
                'weight': null,
                'units': null,
                'description': 'Jump over the barbell burpees'
            }
        ],
    },
    {
        'name' : 'Koala',
        'sets' : 5,
        'rest' : null,
        'data' : [
            {
                'name': 'squats',
                'reps': 30,
                'weight': null,
                'units': null,
                'description': 'regular squats'
            },
            {
                'name': 'Bicep curls',
                'reps': 10,
                'weight': 45,
                'units': 'kg',
                'description': 'Barbell bicep curls'
            },
            {
                'name': 'box jumps',
                'reps': 15,
                'weight': null,
                'units': null,
                'description': 'Box jump 20 in'
            }
        ],
    }
];

setPredefinedWorkouts = () => {

    for(let i = 0; i < preWorkouts.length; i++) {

        Workout.create({
            name: preWorkouts[i]['name'],
            sets: preWorkouts[i]['sets'],
            rest: preWorkouts[i]['rest'],
            predefined: true
        })
        .then(workout => {

            for(let j = 0; j < preWorkouts[i]['data'].length; j++) {

                let tmp = preWorkouts[i]['data'][j];

                Exercise.create({
                    workoutId: workout.id,
                    name: tmp['name'],
                    reps: tmp['reps'],
                    weight: tmp['weight'],
                    units : tmp['units'],
                    description: tmp['description']
                });
            }
        })
    }

    console.log('***************************');
    console.log('Predefined Workouts Created');
    console.log('***************************');
}

const SALT = 8;

// initializes the roles with their respective ids
setUsers = async () => {

    // create test athlete
    const user_athlete = await User.create({
        email: "athlete@usfca.edu",
        password: bcrypt.hashSync("Lolipop123!", SALT),
        role: getRole(0)
    });

    // create a test trainer
    const user_trainer = await User.create({
        email: "trainer@usfca.edu",
        password: bcrypt.hashSync("Lolipop123!", SALT),
        role: getRole(1)
    });

    // create trainer instance
    const trainer = await Trainer.create({
        userId: user_trainer.id,
        name: 'Chris Hayes',
        specialty: 'Crossfit'
    });

    // create athlete instance
    await Athlete.create({
        userId: user_athlete.id,
        name: 'Jessica Cruz',
        email: user_athlete.email,
        trainerId: trainer.id
    });

    await db.profile.bulkCreate([
        {
            firstName: 'Jessica',
            lastName: 'Cruz',
            dob: moment('2000-01-01'),
            gender: 'female',
            userId: user_athlete.id
        },
        {
            firstName: 'Chris',
            lastName: 'Hayes',
            dob: moment('2000-01-01'),
            gender: 'male',
            userId: user_trainer.id
        }
    ]);

    await db.address.bulkCreate([
        {
            street: '741 valencia st',
            city: 'san francisco',
            state: 'CA',
            zipcode: 94110,
            userId: user_athlete.id
        },
        {
            street: '2130 fulton st',
            city: 'san francisco',
            state: 'CA',
            zipcode: 94117,
            userId: user_trainer.id
        }
    ]);

    await db.goal.create({
        goalType: getObjective(0),
        currentWeight: 185.0,
        goalWeight: 175.0,
        height: 6.0,
        userId: user_athlete.id
    });

    console.log("********************************");
    console.log("Test athlete and trainer created");
    console.log("********************************");
}

module.exports.initial = {
    setPredefinedWorkouts: setPredefinedWorkouts,
    setUsers : setUsers
}