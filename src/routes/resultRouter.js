const express = require('express');
const resultController = require('../controllers/resultController');



const router = express.Router();


router.use('/', resultController.dummy);

module.exports = router;

