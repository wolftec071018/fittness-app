
// exercise model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        name: { type: DataTypes.STRING },
        description : { type: DataTypes.STRING },
        reps : { type : DataTypes.INTEGER },
        weight : { type: DataTypes.DOUBLE },
        units : { type: DataTypes.STRING },
        sets : { type : DataTypes.INTEGER },
        rest : { type: DataTypes.DOUBLE },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
};
