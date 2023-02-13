const express = require('express');
const reservationController = require('../controllers/reservationController');


const router = express.Router();

router.use('/', reservationController.dummy);




module.exports = router;

