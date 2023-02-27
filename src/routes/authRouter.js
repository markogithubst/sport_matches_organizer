const express = require('express');
const authController = require('../controllers/authController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');

const router = express.Router();

router.post('/login',
/* #swagger.tags = ['Login'] */
  callbackErrorHandler(authController.loginUser));
router.get('/logout',
/* #swagger.tags = ['Logout'] */
  callbackErrorHandler(authController.logoutUser));

module.exports = router;
