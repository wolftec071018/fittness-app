// measurements model
// stores the given circumference in inches
// and a link to the image in cloudinary
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("measurements", {
        circumference : {
            defaultValue: 0,
            type: DataTypes.INTEGER
        },
        unit: {
            defaultValue: "inches",
            type: DataTypes.STRING
        },
        link : { type: DataTypes.STRING }
    });
};