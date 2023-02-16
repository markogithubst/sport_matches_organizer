const express = require('express');
const fieldController = require('../controllers/fieldController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateField } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(fieldController.viewAllFields));
router.post('/', validateField, callbackErrorHandler(fieldController.createField));
router.get('/:id', validateId, callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id', validateId, validateField, callbackErrorHandler(fieldController.updateField));
router.delete('/:id', validateId, callbackErrorHandler(fieldController.deleteField));

module.exports = router;
