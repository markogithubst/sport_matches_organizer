const express = require('express');
const teamController = require('../controllers/teamController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateTeam } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(teamController.viewAllTeams));
router.post('/', validateTeam, callbackErrorHandler(teamController.createTeam));
router.get('/:id', validateId, callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id', validateId, validateTeam, callbackErrorHandler(teamController.updateTeam));
router.delete('/:id', validateId, callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
