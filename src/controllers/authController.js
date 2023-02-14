const User = require('../models/User');
const bcrypt = require('bcrypt');
const { ErrorTypes } = require('../errors/errorTypes');
const { ServerError } = require('../errors/ServerError');
const { createJWT } = require('../token.js');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ServerError(ErrorTypes.notFound);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ServerError(ErrorTypes.notValid);

  const token = createJWT(user);

  res.header('Authorization', 'Bearer ' + token);

  return res.status(200).json({ message: `User ${user.username} logged in successfully!` });
};

module.exports = {
  loginUser
};
