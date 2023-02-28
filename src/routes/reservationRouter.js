/* eslint-disable max-len */
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateDoubleId, validateQuery, validateReservation } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin, isProfileOwner } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Reservation'] */
  callbackErrorHandler(reservationController.viewAllReservations));
router.post('/',
/* #swagger.tags = ['Reservation'] */
  isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.createReservation));
router.get('/filter',
/* #swagger.tags = ['Reservation'] */
  validateQuery, callbackErrorHandler(reservationController.filterReservation));
router.get('/:id',
/* #swagger.tags = ['Reservation'] */
  validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id',
/* #swagger.tags = ['Reservation'] */
  validateId, isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId',
/* #swagger.tags = ['Reservation'] */
  validateDoubleId, isLoggedIn, isProfileOwner, callbackErrorHandler(reservationController.addPlayerToReservation));
router.put('/:id/player-withdraw/:playerId',
/* #swagger.tags = ['Reservation'] */
  validateDoubleId, isLoggedIn, isProfileOwner, callbackErrorHandler(reservationController.removePlayerFromReservation));
router.delete('/:id',
/* #swagger.tags = ['Reservation'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id',
/* #swagger.tags = ['Reservation'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.cancelReservation));
module.exports = router;
