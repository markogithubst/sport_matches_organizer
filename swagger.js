const dotenv = require('dotenv');
dotenv.config();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

require('dotenv').config({
  path: '.env.development'
});

const doc = {
  info: {
    title: 'Sports Match Organizer Aplication',
    description: 'Simple API overview'
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
