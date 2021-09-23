const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const verifyGoals = require('./verifyGoals');
const verifyAddress = require('./verifyAddress');
const verifyUpdate = require('./verifyUpdate');
const verifyParams = require('./validators');


// export auth header verifier
module.exports = {
    authJwt,
    verifySignUp,
    verifyGoals,
    verifyAddress,
    verifyUpdate,
    verifyParams
}