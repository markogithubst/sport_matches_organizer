const express = require('express');
const matchController = require('../controllers/matchController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateMatch } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(matchController.viewAllMacthes));
router.post('/', validateMatch, callbackErrorHandler(matchController.createMatch));
router.get('/:id', validateId, callbackErrorHandler(matchController.viewSingleMatch));
router.put('/:id', validateId, validateMatch, callbackErrorHandler(matchController.updateMatch));
router.delete('/:id', validateId, callbackErrorHandler(matchController.deleteMatch));

module.exports = router;
