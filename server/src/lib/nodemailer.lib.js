const nodemailer = require('nodemailer');
const { sendInBlueMailId, sendInBluePassword } = require('../constants.js');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: sendInBlueMailId,
        pass: sendInBluePassword,
    },
});

async function sendEmail(to, subject, htmlContent) {
    try {
        // Send the email
        await transporter.sendMail({
            from: sendInBlueMailId,
            to,
            subject,
            html: htmlContent,
        });
        return { success: true, response: response.data };
    } catch (error) {
        return { success: false, error: 'Failed to send otp on mail' };
    }
}

module.exports = {
    transporter,
    sendEmail
};
