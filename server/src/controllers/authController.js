const User = require('../models/User');
const bcrypt = require('bcrypt');
const { ErrorMessages } = require('../errors/errorMessages');
const { ValidationError, NotFoundError } = require('../errors/Errors');
const { createJWT } = require('../token.js');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ValidationError(ErrorMessages.passError);

  const token = createJWT(user);

  res.header('Authorization', 'Bearer ' + token);
  res.set('Access-Control-Expose-Headers', 'Authorization');

  return res.status(200).json({ success: true, message: `User ${user.username} logged in successfully!` });
};

const logoutUser = async (req, res) => {
  res.header('Authorization', '');

  return res.status(200).json({ success: true, message: 'User logged out!' });
};

module.exports = {
  loginUser,
  logoutUser
};
