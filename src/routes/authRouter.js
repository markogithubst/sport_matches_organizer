const express = require('express');
const authController = require('../controllers/authController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');

const router = express.Router();

router.post('/login', callbackErrorHandler(authController.loginUser));
router.get('/logout', callbackErrorHandler(authController.logoutUser));

module.exports = router;
