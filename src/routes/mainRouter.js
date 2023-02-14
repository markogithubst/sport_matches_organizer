const express = require('express');
const fieldRouter = require('./fieldRouter');
const matchRouter = require('./matchRouter');
const reservationRouter = require('./reservationRouter');
const resultRouter = require('./resultRouter');
const teamRouter = require('./teamRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/field', fieldRouter);
router.use('/match', matchRouter);
router.use('/reservation', reservationRouter);
router.use('/result', resultRouter);
router.use('/team', teamRouter);
router.use('/user', userRouter);

module.exports = router;
