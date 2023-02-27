const express = require('express');
const teamController = require('../controllers/teamController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateTeam } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewAllTeams));
router.get('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateTeam, callbackErrorHandler(teamController.updateTeam));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
