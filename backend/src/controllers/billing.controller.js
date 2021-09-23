/**
 * Billing
 * -------
 * Stripe implementation to add subscription
 * billing to trainers
 */

// stripe API key
const { stripeConfig } = require('../config/stripe.config');
// strip library
const stripe = require('stripe')(stripeConfig.apiKey);
// operators for sql
const { Op } = require("sequelize");
// database
const { db } = require('../models');

// user model
const User = db.user;

// controller for billing
exports.billing = (req, res) => {

    User.findOne({
        where: {
            [Op.and]: [
                { id: req.userId },
                { role: 'trainer'}
            ]
        },
        attributes: ['id', 'active', 'email']
    })
    .then(async user => {

        if (!user) {
            res.status(404).json({
                message: "Trainer not found"
            });
            return;
        }

        // prices for frontend:
        // Basic plan -> $20 -> id: price_1IeBbeCracMAtHwLGemflsAO
        // Premium plan -> $50 -> id: price_1IeBcHCracMAtHwLtZ0Xj6VD
        const { priceId } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                    },
                ],
                // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
                // the actual Session ID is returned in the query parameter when your customer
                // is redirected to the success page.
                success_url: 'http://localhost:3000/billing/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'http://localhost:3000/billing/canceled',
            });

            if (session.subscription.status === 'active') {
                user.active = true;
                user.save();
            }

            // return the session id
            res.json({
                sessionId: session.id,
            });
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }

    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        });
    });

}