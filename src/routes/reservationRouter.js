const express = require('express');
const reservationController = require('../controllers/reservationController');
const {callbackErrorHandler} = require('../middleware/errorHandler');


const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', callbackErrorHandler(reservationController.createReservation));
router.get('/:id', callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', callbackErrorHandler(reservationController.updateReservation));
router.delete('/:id', callbackErrorHandler(reservationController.deleteReservation));


module.exports = router;

