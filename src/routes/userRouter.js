const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(userController.viewAllUsers));
router.post('/', callbackErrorHandler(userController.createUser));
router.get('/:id', callbackErrorHandler(userController.viewSingleUser));
router.put('/:id', callbackErrorHandler(userController.updateUser));
router.delete('/:id', callbackErrorHandler(userController.deleteUser));

module.exports = router;
