/* eslint-disable max-len */
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateReservation } = require('../middleware/requestValidationHandler');
const { authenticateToken, validateTokenAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', validateReservation, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.createReservation));
router.get('/:id', validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', validateId, validateReservation, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId', callbackErrorHandler(reservationController.addPlayerToReservation));
router.delete('/:id', validateId, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id', validateId, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.cancelReservation));
module.exports = router;
