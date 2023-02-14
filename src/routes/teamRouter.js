const express = require('express');
const teamController = require('../controllers/teamController');
const { callbackErrorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(teamController.viewAllTeams));
router.post('/', callbackErrorHandler(teamController.createTeam));
router.get('/:id', callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id', callbackErrorHandler(teamController.updateTeam));
router.delete('/:id', callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
