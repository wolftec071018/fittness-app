
// trainer model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("trainer", {
        // trainer id is the same as userId
        name: { type: DataTypes.STRING },
        specialty: { type: DataTypes.STRING },
        statement: { type: DataTypes.STRING },
        available: { type: DataTypes.DATE }
    });
}