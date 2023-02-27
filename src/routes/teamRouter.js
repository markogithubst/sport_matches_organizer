const express = require('express');
const teamController = require('../controllers/teamController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateTeam } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Team'] */
  isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewAllTeams));
router.get('/:id',
/* #swagger.tags = ['Team'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id',
/* #swagger.tags = ['Team'] */
  validateId, isLoggedIn, isAdmin, validateTeam, callbackErrorHandler(teamController.updateTeam));
router.delete('/:id',
/* #swagger.tags = ['Team'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
