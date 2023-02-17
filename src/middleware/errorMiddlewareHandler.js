const { ValidationError, NotFoundError, AuthorizationError, AuthenticationError } = require('../errors/Errors');

const callbackErrorHandler = (callback) => {
  return (req, res, next) => callback(req, res, next).catch(next);
};

const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof AuthenticationError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof AuthorizationError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Oops, something went wrong!'
    });
    return next(err);
  }
};

module.exports.errorMiddleware = errorMiddleware;
module.exports.callbackErrorHandler = callbackErrorHandler;
