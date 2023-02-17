const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError, AuthenticationError, AuthorizationError } = require('../errors/Errors');

const isLoggedIn = callbackErrorHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new AuthenticationError(ErrorMessages.noLoggedIn);

  const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
  req.user = decoded;
  const user = await User.findOne({ id: req.user._id });
  if (!user) throw new NotFoundError(ErrorMessages.userNotFound);

  return next();
});

const isAdmin = callbackErrorHandler(async (req, res, next) => {
  if (req.user.role !== 'ADMIN') throw new AuthorizationError(ErrorMessages.unauthorized);

  next();
});

const isProfileOwner = callbackErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ id });

  if (!user) {
    throw new NotFoundError(ErrorMessages.userNotFound);
  } else if (id !== req.user.id) {
    throw new AuthorizationError(ErrorMessages.unauthorized);
  }

  return next();
});

module.exports = {
  isLoggedIn,
  isAdmin,
  isProfileOwner
};
