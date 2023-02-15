const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes/mainRouter');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(errorHandler);

app.use('/', routes);

module.exports = app;
