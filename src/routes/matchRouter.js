const express = require('express');
const matchController = require('../controllers/matchController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateMatch } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Match']
  #swagger.security = []
*/
  callbackErrorHandler(matchController.viewAllMacthes));
router.get('/:id',
/* #swagger.tags = ['Match']
  #swagger.security = []
*/
  validateId, callbackErrorHandler(matchController.viewSingleMatch));
router.put('/:id',
/* #swagger.tags = ['Match'] */
  validateId, isLoggedIn, isAdmin, validateMatch, callbackErrorHandler(matchController.updateMatch));
router.delete('/:id',
/* #swagger.tags = ['Match'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(matchController.deleteMatch));

module.exports = router;
