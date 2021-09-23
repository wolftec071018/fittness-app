// database
const { db } = require('../models');
// user model for finding the athlete's profile
const User = db.user;


// anonymous users
exports.allAccessBoard = function (req, res) {
    res.status(200).json({
        message: "Public content"
    })
};

// user logged in auth
exports.userBoard = async (req, res) => {
    // look for the requested user
    const user = await User.findOne({
        where: {
            id: req.userId
        },
        include: [
            db.profile,
            db.address,
            db.goal,
            db.athlete,
            db.trainer
        ]
    })

    if(!user) {
        res.status(404).json({
            message: "User not Found"
        });
        return;
    }

    res.status(200).json(user);
};