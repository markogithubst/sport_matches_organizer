require('dotenv').config({
  path: '.env.test'
});

const config = {
  reporters: [
    'default'
  ],
  collectCoverage: true,
  verbose: true
};

module.exports = config;
