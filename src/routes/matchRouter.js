const express = require('express');
const matchController = require('../controllers/matchController');


const router = express.Router();


router.use('/', matchController.dummy);





module.exports = router;

