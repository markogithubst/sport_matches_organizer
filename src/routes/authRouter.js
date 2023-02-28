const express = require('express');
const authController = require('../controllers/authController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');

const router = express.Router();

router.post('/login',
/* #swagger.tags = ['Login']
  #swagger.security = []
*/
  callbackErrorHandler(authController.loginUser));
router.get('/logout',
/* #swagger.tags = ['Logout']
  #swagger.security = []
*/
  callbackErrorHandler(authController.logoutUser));

module.exports = router;
