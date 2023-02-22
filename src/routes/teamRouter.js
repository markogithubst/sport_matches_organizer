const express = require('express');
const teamController = require('../controllers/teamController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateTeam } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(teamController.viewAllTeams));
router.post('/', isLoggedIn, isAdmin, validateTeam, callbackErrorHandler(teamController.createTeam));
router.get('/:id', validateId, callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateTeam, callbackErrorHandler(teamController.updateTeam));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
