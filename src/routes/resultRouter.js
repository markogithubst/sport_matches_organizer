const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', callbackErrorHandler(resultController.viewAllResluts));
router.post('/', callbackErrorHandler(resultController.createResult));
router.get('/:id', callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id', callbackErrorHandler(resultController.updateResult));
router.delete('/:id', callbackErrorHandler(resultController.deleteResult));

module.exports = router;
