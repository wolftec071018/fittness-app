// const nodemailer = require('nodemailer');
const MailGen = require('mailgen');

const APP_EMAIL = "can-reply@fitness.fit"

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     secure: true,
//     auth: {
//         user: "<email>",
//         password: "<password>"
//     }
// });

MailGenerator = new MailGen({
    theme: "neopolitan",
    product: {
        name: "Fitness Tracker",
        link: "https://localhost:3000/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
        // Custom copyright notice
        copyright: 'Copyright © 2021 Fitness-Tracker. All rights reserved.',
    }
});

module.exports.sendEmail = (email, subject, emailBuilder) => {

    let response = {
        body: {
            title: emailBuilder.title,
            // greeting: "",
            signature: false,
            intro: emailBuilder.intro,
            action: {
                instructions: emailBuilder.instructions,
                button: {
                    color: '#22BC66',
                    text: emailBuilder.btnText,
                    link: emailBuilder.link
                }
            },
            outro: ['Need help, or have questions?', 'Just reply to this email, we\'d love to help.']
        }
    }

    let mail = MailGenerator.generate(response);

    require('fs').writeFileSync('preview.html', mail, 'utf8');

    let msg = {
        from: APP_EMAIL,
        to: email,
        subject: subject,
        html: mail
    };

    return msg.subject;

    // transporter
    //     .sendMail(msg)
    //     .then(() => {
    //             return 200;
    //         },
    //         (err) => {
    //             return 400;
    //         });
}