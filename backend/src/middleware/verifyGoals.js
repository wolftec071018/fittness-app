const { getObjective } = require('../utils/helper.util');

// check for valid objectives/goals
validGoalType = (req, res, next) => {
    if (req.body.goalType) {
        // Get the objective
        const objective = getObjective(req.body.goalType);

        if (!objective) {
            res.status(400).json({
                message: "Incorrect goal type"
            });
            return;
        }
    }
    next();
}

// check for a valid weight in pounds
validWeight = (req, res, next) => {
    if (req.body.currentWeight || req.body.goalWeight) {
        let currentWeight = parseInt(req.body.currentWeight);
        let goalWeight = parseInt(req.body.goalWeight);

        if(isNaN(currentWeight) || isNaN(goalWeight)) {
            res.status(400).json({
                message : "Improper weight format"
            });
            return;
        }

        if ((currentWeight || goalWeight) < 5 ||
            (currentWeight || goalWeight) > 1500) {
            res.status(400).json({
                message : "Weight out of bounds"
            });
            return;
        }
    }
    next();
}

// check valid height in inches
validHeight = (req, res, next) => {
    if (req.body.height) {
        let height = parseInt(req.body.height);

        if (isNaN(height)) {
            res.status(400).json({
                message : "Improper height format"
            });
            return;
        }

        if (height < 20 || height > 120) {
            res.status(400).json({
                message : "Height out of bounds"
            });
            return;
        }
    }
    next();
}

const verifyGoals = {
    validWeight: validWeight,
    validHeight: validHeight,
    validGoalType: validGoalType
}

module.exports = verifyGoals;