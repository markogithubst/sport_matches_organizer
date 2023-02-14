const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateUser } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(userController.viewAllUsers));
router.post('/', validateUser, callbackErrorHandler(userController.createUser));
router.get('/:id', validateId, callbackErrorHandler(userController.viewSingleUser));
router.put('/:id', validateId, validateUser, callbackErrorHandler(userController.updateUser));
router.delete('/:id', validateId, callbackErrorHandler(userController.deleteUser));

module.exports = router;
