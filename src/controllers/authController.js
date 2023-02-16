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

  return res.status(200).json({ message: `User ${user.username} logged in successfully!` });
};

module.exports = {
  loginUser
};
