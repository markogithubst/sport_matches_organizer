/* eslint-disable max-len */
const express = require('express');
const resultController = require('../controllers/resultController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateResult } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Result']
  #swagger.security = []
  #swagger.summary = 'Retrieve a list of results'
    #swagger.responses[200] = {
            description: 'Displaying a list of results',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/ResultList' }
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
  callbackErrorHandler(resultController.viewAllResluts));
router.post('/',
/* #swagger.tags = ['Result']
#swagger.requestBody = {
    required: true,
    content: {
      'application.json': {
        schema: { $ref: '#/definitions/ResultBody' }
      }
    }
  }

  #swagger.summary = 'Add a new Result'
      #swagger.responses[201] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/ResultResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidResult'
            }
        }
    }
  }
  #swagger.responses[401] = {
    description: 'Responds with unauthenticated error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthenticated'
            }
        }
    }
  }
  #swagger.responses[403] = {
    description: 'Responds with unauthorized error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthorized'
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
  isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.createResult));
router.get('/:id',
/* #swagger.tags = ['Result']
  #swagger.security = []

  #swagger.summary = 'Retrieve a single Result'
    #swagger.responses[200] = {
            description: 'Displaying a single Result',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/ResultResponse' }
                }
            }

        }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidId'
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
  validateId, callbackErrorHandler(resultController.viewSingleResult));
router.put('/:id',
/* #swagger.tags = ['Result']

#swagger.requestBody = {
    required: true,
    content: {
      'application.json': {
        schema: { $ref: '#/definitions/ResultBody' }
      }
    }
  }

  #swagger.summary = 'Update Result'
      #swagger.responses[202] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/ResultResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidResult'
            }
        }
    }
  }
  #swagger.responses[401] = {
    description: 'Responds with unauthenticated error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthenticated'
            }
        }
    }
  }
  #swagger.responses[403] = {
    description: 'Responds with unauthorized error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthorized'
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
  validateId, isLoggedIn, isAdmin, validateResult, callbackErrorHandler(resultController.updateResult));
router.delete('/:id',
/* #swagger.tags = ['Result']
#swagger.summary = 'Delete one Result'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/ResultResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidId'
            }
        }
    }
  }
  #swagger.responses[401] = {
    description: 'Responds with unauthenticated error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthenticated'
            }
        }
    }
  }
  #swagger.responses[403] = {
    description: 'Responds with unauthorized error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthorized'
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
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(resultController.deleteResult));

module.exports = router;
