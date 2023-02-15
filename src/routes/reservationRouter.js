/* eslint-disable max-len */
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateReservation } = require('../middleware/requestValidationHandler');
const { authenticateToken, validateTokenAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', validateReservation, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.createReservation));
router.get('/:id', validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', validateId, validateReservation, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.updateReservation));
router.delete('/:id', validateId, authenticateToken, validateTokenAdmin, callbackErrorHandler(reservationController.deleteReservation));

module.exports = router;
