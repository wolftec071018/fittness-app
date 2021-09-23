module.exports = (sequelize, DataTypes) => {
    return sequelize.define('workout', {
        name: { type: DataTypes.STRING },
        createdBy: { type: DataTypes.INTEGER },
        startDate: { type: DataTypes.DATEONLY },
        endDate: { type: DataTypes.DATEONLY },
        sets : { type: DataTypes.INTEGER },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        rest: { type: DataTypes.INTEGER },
        predefined: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}
