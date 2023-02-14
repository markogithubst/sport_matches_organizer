const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes/mainRouter');

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/', routes);

module.exports = app;
