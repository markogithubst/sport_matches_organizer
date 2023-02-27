/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateUser } = require('../middleware/requestValidationHandler');
const { isProfileOwner, isLoggedIn } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['User'] */
  callbackErrorHandler(userController.viewAllUsers));
router.get('/:id/history',
/* #swagger.tags = ['User'] */
  validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.viewHistory));
router.post('/',
/* #swagger.tags = ['User'] */
  validateUser, callbackErrorHandler(userController.registerUser));
router.get('/:id',
/* #swagger.tags = ['User'] */
  validateId, callbackErrorHandler(userController.viewSingleUser));
router.put('/:id',
/* #swagger.tags = ['User'] */
  validateId, isLoggedIn, isProfileOwner, validateUser, callbackErrorHandler(userController.updateUser));
router.delete('/:id',
/* #swagger.tags = ['User'] */
  validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.deleteUser));

module.exports = router;
