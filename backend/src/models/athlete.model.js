
// client model for db
// userId as primary key for better association and queries
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("athlete", {
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING }
    });
};