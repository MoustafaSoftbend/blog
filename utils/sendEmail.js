const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.MAIL_ADDRESS}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s" ,info.messageId);

}

module.exports = sendEmail;