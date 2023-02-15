/* eslint-disable max-len */
const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateResult } = require('../middleware/requestValidationHandler');
const { authenticateToken, validateTokenAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(resultController.viewAllResluts));
router.post('/', validateResult, authenticateToken, validateTokenAdmin, callbackErrorHandler(resultController.createResult));
router.get('/:id', validateId, callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id', validateId, validateResult, authenticateToken, validateTokenAdmin, callbackErrorHandler(resultController.updateResult));
router.delete('/:id', validateId, authenticateToken, validateTokenAdmin, callbackErrorHandler(resultController.deleteResult));

module.exports = router;
