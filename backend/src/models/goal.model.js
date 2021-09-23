
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("goal", {
        goalType : { type: DataTypes.STRING },
        currentWeight : { type: DataTypes.DOUBLE },
        goalWeight : { type: DataTypes.DOUBLE },
        height : { type: DataTypes.DOUBLE },
    });
};