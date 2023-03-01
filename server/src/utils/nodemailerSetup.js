const nodemailer = require('nodemailer');

const sendEmail = (recepient, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false
  });

  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: `${recepient}`,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    error ? console.error(error) : console.log('Email sent: ' + info.response);
  });
};

module.exports.sendEmail = sendEmail;
