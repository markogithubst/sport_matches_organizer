/* eslint-disable max-len */
const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateResult } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Result'] */
  callbackErrorHandler(resultController.viewAllResluts));
router.post('/',
/* #swagger.tags = ['Result'] */
  isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.createResult));
router.get('/:id',
/* #swagger.tags = ['Result'] */
  validateId, callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id',
/* #swagger.tags = ['Result'] */
  validateId, isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.updateResult));
router.delete('/:id',
/* #swagger.tags = ['Result'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(resultController.deleteResult));

module.exports = router;
