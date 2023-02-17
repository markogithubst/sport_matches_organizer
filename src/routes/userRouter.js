/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateUser } = require('../middleware/requestValidationHandler');
const { isProfileOwner, isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(userController.viewAllUsers));
router.get('/:id/history', validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.viewHistory));
router.post('/', validateUser, callbackErrorHandler(userController.registerUser));
router.get('/:id', validateId, callbackErrorHandler(userController.viewSingleUser));
router.put('/:id', validateId, validateUser, callbackErrorHandler(userController.updateUser));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(userController.deleteUser));

module.exports = router;
