const express = require('express');
const matchController = require('../controllers/matchController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateMatch } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(matchController.viewAllMacthes));
router.post('/', isLoggedIn, isAdmin, validateMatch, callbackErrorHandler(matchController.createMatch));
router.get('/:id', validateId, callbackErrorHandler(matchController.viewSingleMatch));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateMatch, callbackErrorHandler(matchController.updateMatch));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(matchController.deleteMatch));

module.exports = router;
