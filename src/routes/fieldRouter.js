const express = require('express');
const fieldController = require('../controllers/fieldController');
const {callbackErrorHandler} = require('../middleware/errorHandler');


const router = express.Router();


router.get('/', callbackErrorHandler(fieldController.viewAllFields));
router.post('/', callbackErrorHandler(fieldController.createField));
router.get('/:id', callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id', callbackErrorHandler(fieldController.updateField));
router.delete('/:id', callbackErrorHandler(fieldController.deleteField));


module.exports = router;

