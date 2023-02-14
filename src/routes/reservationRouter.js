const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorHandler');
const { validateId, validateReservation } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', validateReservation, callbackErrorHandler(reservationController.createReservation));
router.get('/:id', validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', validateId, validateReservation, callbackErrorHandler(reservationController.updateReservation));
router.delete('/:id', validateId, callbackErrorHandler(reservationController.deleteReservation));

module.exports = router;
