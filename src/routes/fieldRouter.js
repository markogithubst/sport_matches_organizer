const express = require('express');
const fieldController = require('../controllers/fieldController');
const {callbackErrorHandler} = require('../middleware/errorHandler');


const router = express.Router();

// wrap controller calls in the callbackErrorHandler to avoid writing try..catch blocks
router.use('/', callbackErrorHandler(fieldController.dummy));




module.exports = router;

