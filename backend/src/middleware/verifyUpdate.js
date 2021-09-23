// database models
const { db } = require('../models');
// encryption module
const bcrypt = require('bcryptjs');

// Roles and user models
const User = db.user;

// compares passwords
comparePassword = (req, res, next) => {
    User.findOne({
        where : {
            id : req.params.userId
        }
    })
    .then(currentUser => {
        const validPassword = bcrypt.compareSync(
            req.body.password,
            currentUser.password
        );
        if(!validPassword){
            res.status(400).json({
                message: "Invalid Password"
            })
            return;
        }
        next();

    }).catch(err => {
        res.status(400).json({
            message :  err.message
        })
    })
}


const verifyUpdate = {
    comparePassword :  comparePassword,
}

module.exports = verifyUpdate;