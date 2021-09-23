const { db } = require('../models');

module.exports.getObjective = (index) => {
    if (index >= 0 && index < db.OBJECTIVES.length) {
        return db.OBJECTIVES[index];
    }
    return null;
}

module.exports.getRole = (index) => {
    if (index >= 0 && index < db.ROLES.length) {
        return db.ROLES[index];
    }
    return db.ROLES[0];
}

module.exports.capitalize = function(s) {
    if (typeof s !== 'string') return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}