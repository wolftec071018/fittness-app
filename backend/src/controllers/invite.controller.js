// general database file
const { db } = require('../models');
// generic email utility function for sending emails
const { sendEmail } = require("../utils/email.util");

const { capitalize } = require("../utils/helper.util");

// models to use
const Trainer = db.trainer;
const Athlete = db.athlete;

/**
 * Email Invite
 * ------------
 * Invite function to send email to future clients
 */
exports.emailInvite = async (req, res) => {
    // get the name of the trainer from the profile
    const trainer = await Trainer.findOne({
        where: {
            userId: req.userId
        }
    });


    // get the email and message from trainer
    const { email, message }  = req.body;

    // create subject line for email
    const subject = `${trainer.name} wants to help you get in shape`;

    // create intro message for the email
    const intro = message?
        capitalize(message) :
        "You have received this email because a trainer wants you to join Fitness-Tracker"

        // check for an existing user
        const athlete = await Athlete.findOne({
            where: {
                email: email
            }
        });

        // builds email with its details
        // todo maybe hash the trainer id?
        const emailBuilder = {
            title: "Let's get started!",
            intro: intro,
            instructions: athlete?
                [
                    `To get started working out with ${trainer.name}`,
                    'all you have to do is click the button below'
                ] :
                'To get started with our fitness-tracker please click below',
            btnText: 'Get Started',
            link: athlete?
                "https://localhost:3000/login?inviteId=" + trainer.userId :
                "https://localhost:3000/register?inviteId=" + trainer.userId,
        };

        // send email function
        let statusCode = sendEmail(email, subject, emailBuilder);

        // return success
        res.status(200).json({
            code: statusCode,
            message: "Email sent!"
        });
};
