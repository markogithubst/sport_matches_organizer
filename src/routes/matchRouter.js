const express = require('express');
const matchController = require('../controllers/matchController');
const { callbackErrorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(matchController.viewAllMacthes));
router.post('/', callbackErrorHandler(matchController.createMatch));
router.get('/:id', callbackErrorHandler(matchController.viewSingleMatch));
router.put('/:id', callbackErrorHandler(matchController.updateMatch));
router.delete('/:id', callbackErrorHandler(matchController.deleteMatch));

module.exports = router;
