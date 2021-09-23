/**
 * Index
 * -----
 *
 * Creates a connection to postgres using Sequelize, then
 * Builds the different models required by the app.
 * Finally it creates associations between tables.
 */

// sequelize functions needed to start
const { Sequelize, DataTypes } = require('sequelize');

const { dbUsername, dbPassword } = require('../config/auth.config');

// sequelize connection to db
const sequelize = new Sequelize(`postgres://${dbUsername}:${dbPassword}@localhost/fitness`, { logging: false });
// const sequelize = new Sequelize('postgres://localhost/fitness',{ logging: false });


// database models to be exported and used on
// various pages.
const db = {
    sequelize: sequelize,
    user: require("./user.model")(sequelize, DataTypes),
    profile: require("./profile.model")(sequelize, DataTypes),
    address: require("./address.model")(sequelize, DataTypes),
    goal: require("./goal.model")(sequelize, DataTypes),
    athlete: require("./athlete.model")(sequelize, DataTypes),
    trainer: require("./trainer.model")(sequelize, DataTypes),
    workout: require("./workout.model")(sequelize, DataTypes),
    exercise: require("./exercise.model")(sequelize, DataTypes),
    bodyPart: require('./body-part.model')(sequelize, DataTypes),
    measurements: require('./measurements.model')(sequelize, DataTypes)
}

// different roles
db.ROLES = ["athlete", "trainer", "admin"];
db.OBJECTIVES = ["lose", "maintain", "build"];

// one profile per user
db.user.hasOne(db.profile, {
    onDelete: "CASCADE",
})
db.profile.belongsTo(db.user);

// one address per user
db.user.hasOne(db.address, {
    onDelete: "CASCADE",
});
db.address.belongsTo(db.user);

// one goal per user
db.user.hasOne(db.goal, {
    onDelete: "CASCADE",
});
db.goal.belongsTo(db.user);

// one athlete account per user
db.user.hasOne(db.athlete, {
    onDelete: "CASCADE",
});
db.athlete.belongsTo(db.user);

// one trainer account per user
db.user.hasOne(db.trainer, {
    onDelete: "CASCADE",
});
db.trainer.belongsTo(db.user);

// trainer can train many athletes
db.trainer.hasMany(db.athlete);
db.athlete.belongsTo(db.trainer);

// athletes can have many workouts
db.athlete.hasMany(db.workout, {
    onDelete: "CASCADE"
});
db.workout.belongsTo(db.athlete);

// many exercises in workout
// one exercise per workout
db.workout.hasMany(db.exercise, {
    onDelete: "CASCADE"
});
db.exercise.belongsTo(db.workout);

// relation between the athlete and the body measurements
db.athlete.hasMany(db.bodyPart, {
    onDelete: "CASCADE"
});
db.bodyPart.belongsTo(db.athlete);

// relation between the body parts and the measurements
db.bodyPart.hasMany(db.measurements, {
    onDelete: "CASCADE"
});
db.measurements.belongsTo(db.bodyPart);

// export the database
module.exports.db = db;
