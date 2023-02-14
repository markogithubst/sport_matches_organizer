const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateResult } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(resultController.viewAllResluts));
router.post('/', validateResult, callbackErrorHandler(resultController.createResult));
router.get('/:id', validateId, callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id', validateId, validateResult, callbackErrorHandler(resultController.updateResult));
router.delete('/:id', validateId, callbackErrorHandler(resultController.deleteResult));

module.exports = router;
