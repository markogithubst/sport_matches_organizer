const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.use('/',userController.dummy);


module.exports = router;

