/**
 * Billing Route
 * -------------
 * Billing route used for
 * allowing the trainer to setup recurring
 * billing using Stripe
 */

// billing controller
const controller = require('../controllers/billing.controller');
// middleware
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Billing detail
     * --------------
     * @requires {req.body} priceId
     */
    app.post(
        '/create-checkout-session/',
        [
            authJwt.verifyToken,
            // authJwt.isTrainer
        ],
        controller.billing
    );
}