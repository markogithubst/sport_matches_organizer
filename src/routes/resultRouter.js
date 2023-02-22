/* eslint-disable max-len */
const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateResult } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(resultController.viewAllResluts));
router.post('/', isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.createResult));
router.get('/:id', validateId, callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.updateResult));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(resultController.deleteResult));

module.exports = router;
