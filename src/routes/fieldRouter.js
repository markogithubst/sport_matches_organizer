const express = require('express');
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateField } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Field']
  #swagger.summary = 'Retrieve a list of fields'
    #swagger.responses[200] = {
            description: 'Displaying a list of fields',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/FieldList' }
                }
            }
        }

*/
  callbackErrorHandler(fieldController.viewAllFields));
router.post('/',
/* #swagger.tags = ['Field'] */
  isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.createField));
router.get('/:id',
/* #swagger.tags = ['Field'] */
  validateId, callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id',
/* #swagger.tags = ['Field'] */
  validateId, isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.updateField));
router.delete('/:id',
/* #swagger.tags = ['Field'] */
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(fieldController.deleteField));

module.exports = router;
