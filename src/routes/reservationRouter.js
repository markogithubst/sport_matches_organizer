/* eslint-disable max-len */
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateDoubleId, validateQuery, validateReservation } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.createReservation));
router.get('/filter', validateQuery, callbackErrorHandler(reservationController.filterReservation));
router.get('/:id', validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', validateId, isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId', validateDoubleId, isLoggedIn, callbackErrorHandler(reservationController.addPlayerToReservation));
router.put('/:id/player-withdraw/:playerId', validateDoubleId, isLoggedIn, callbackErrorHandler(reservationController.removePlayerFromReservation));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.cancelReservation));
module.exports = router;
