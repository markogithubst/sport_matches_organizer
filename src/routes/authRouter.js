const express = require('express');
const authController = require('../controllers/authController');
const { callbackErrorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.post('/login', callbackErrorHandler(authController.loginUser));

module.exports = router;
