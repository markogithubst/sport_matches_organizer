const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json('You must be logged in to view this page');
  }
  try {
    const decoded = await jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decoded;

    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json('User not found');
    }
    if (user.role === 'ADMIN') {
      req.isAdmin = true;
    }
    if (user.role === 'USER') {
      req.isUser = true;
    }
    return next();
  } catch (err) {
    return res.status(401).json('Token is invalid');
  }
};

const validateTokenAdmin = async (req, res, next) => {
  return req.isAdmin !== true
    ? res.status(401).json({ message: 'ADMIN role required for this action' })
    : next();
};

module.exports = {
  authenticateToken,
  validateTokenAdmin
};
