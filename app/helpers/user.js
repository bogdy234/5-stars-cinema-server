const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const userHelpers = {
    hashPasswordAsync: async (password) => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        return hash;
    },
    sendEmail: async (name, email, subject, message) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "te2413136@gmail.com",
                pass: process.env.EMAIL_PASS,
            },
        });

        // send mail with defined transport object
        try {
            const info = await transporter.sendMail({
                from: `"${name}" <${email}>`, // sender address
                to: "filimonbogdan89@gmail.com", // list of receivers
                subject: `${subject}`, // Subject line
                text: `User email: ${email} \nMessage: ${message}`, // plain text body
            });
            return `Message sent: ${info.messageId}`;
        } catch (err) {
            return err;
        }
    },
};

module.exports = userHelpers;
