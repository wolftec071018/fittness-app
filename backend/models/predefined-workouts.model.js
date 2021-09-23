module.exports = (sequelize, DataTypes) => {
    return sequelize.define('predefinedWorkouts', {
        trainerId: { type: DataTypes.BIGINT },
        workoutId: { type: DataTypes.BIGINT },
    });
};