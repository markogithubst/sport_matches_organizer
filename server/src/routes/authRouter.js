const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn, isProfileOwner } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateEmail, validatePassword } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.post('/login',
/* #swagger.tags = ['Login']
  #swagger.security = []

      #swagger.requestBody = {
      required: true,
      content: {
        'application.json': {
            schema: { $ref: '#/definitions/LoginBody' }
        }
      }
    }

    #swagger.summary = 'User logged in'
    #swagger.responses[200] = {
          description: 'Responds with success flag and successful login message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/LoginResponse'
                  }
              }
          }
      }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidPassword'
            }
        }
    }
  }

    #swagger.responses[404] = {
    description: 'Responds with not found error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpNotFound'
            }
        }
      }
    }

    #swagger.responses[500] = {
    description: 'Responds with error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpInternalError'
            }
        }
      }
    }
*/
  callbackErrorHandler(authController.loginUser));
router.get('/logout',
/* #swagger.tags = ['Logout']

    #swagger.summary = 'User logged out'
    #swagger.responses[200] = {
          description: 'Responds with success flag and successful logout message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/LogoutResponse'
                  }
              }
          }
      }

  #swagger.responses[500] = {
  description: 'Responds with error message',
  content: {
      'application/json': {
          schema: {
            $ref: '#/definitions/httpInternalError'
          }
      }
    }
  }

*/
  callbackErrorHandler(authController.logoutUser));

router.post('/forgotten-password', validateEmail, callbackErrorHandler(authController.forgottenPassword));
router.get('/reset-password/:id/:emailToken');
router.patch('/reset-password/:id/:emailToken', callbackErrorHandler(authController.resetPasswordWithLink));
router.patch('/:id/reset-password', validateId, isLoggedIn, isProfileOwner, validatePassword, callbackErrorHandler(authController.resetPassword));
module.exports = router;
