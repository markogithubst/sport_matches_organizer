const { sendEmail } = require('./nodemailerSetup');

const forgottenPasswordEmail = async (user, link) => {
  const subject = 'Reset Password Link';
  const text = `<p>${user.name} ${user.surname}, <br>
   to reset your password click on the following link: <a href=${link}>Reset Link</a></p>`;

  await sendEmail(user.email, subject, text);
};

module.exports.forgottenPasswordEmail = forgottenPasswordEmail;
