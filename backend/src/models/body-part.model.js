// model for body parts
// it saves the name of the body part and how many files are
// stored under that name/id
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("bodyPart", {
        bodyPartName: { type: DataTypes.STRING },
        side: { type: DataTypes.STRING },
        count: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        }
    });
};