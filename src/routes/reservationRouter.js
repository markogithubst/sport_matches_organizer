/* eslint-disable max-len */
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateReservation } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(reservationController.viewAllReservations));
router.post('/', validateReservation, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.createReservation));
router.get('/filter-by-date', callbackErrorHandler(reservationController.filterByDate));
router.get('/filter-by-hour', callbackErrorHandler(reservationController.filterByHour));
router.get('/filter-by-day-of-week', callbackErrorHandler(reservationController.filterByDayOfWeek));
router.get('/:id', validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id', validateId, validateReservation, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId', callbackErrorHandler(reservationController.addPlayerToReservation));
router.delete('/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id', validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.cancelReservation));
module.exports = router;
