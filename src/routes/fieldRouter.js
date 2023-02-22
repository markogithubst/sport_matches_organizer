const express = require('express');
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateField } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(fieldController.viewAllFields));
router.post('/', isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.createField));
router.get('/:id', validateId, callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.updateField));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(fieldController.deleteField));

module.exports = router;
