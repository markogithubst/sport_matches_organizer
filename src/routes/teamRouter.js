const express = require('express');
const teamController = require('../controllers/teamController');


const router = express.Router();

router.use('/', teamController.dummy);


module.exports = router;

