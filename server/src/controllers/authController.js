const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const { ErrorMessages } = require('../errors/errorMessages');
const { ValidationError, NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes');
const { createJWT } = require('../token.js');
const { forgottenPasswordEmail } = require('../utils/forgottenPasswordEmail');
const crypto = require('crypto');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ValidationError(ErrorMessages.passError);

  const token = createJWT(user);

  res.header('Authorization', 'Bearer ' + token);
  res.header('Role', user.role);
  res.header('UserId', user._id);
  res.set('Access-Control-Expose-Headers', ['Authorization', 'Role', 'UserId']);

  return res.status(200).json({ success: true, message: `User ${user.username} logged in successfully!` });
};

const logoutUser = async (req, res) => {
  res.header('Authorization', '');

  return res.status(200).json({ success: true, message: 'User logged out!' });
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    }).save();
  } else {
    await token.delete();
  }

  const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
  await forgottenPasswordEmail(user, link);

  res.status(200).json({ success: true, message: 'Password reset link sent to your email account!' });
};

const resetPasswordWithLink = async (req, res) => {
  const { id, emailToken } = req.params;
  const { password } = req.body;

  const token = await Token.findOne({
    userId: id,
    token: emailToken
  });

  if (!token) throw new ValidationError(ErrorMessages.invalidQuery);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  await token.delete();

  res.status(HTTP_STATUS.ACCEPTED).json({ success: true, message: 'Password successfully updated' });
};

const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const passwordReset = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, {
    new: true
  });

  if (!passwordReset) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(HTTP_STATUS.ACCEPTED).json({ success: true, message: 'Password successfully updated' });
};

module.exports = {
  loginUser,
  logoutUser,
  forgottenPassword,
  resetPasswordWithLink,
  resetPassword
};
