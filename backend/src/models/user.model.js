
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'athlete'
        }
    });
};