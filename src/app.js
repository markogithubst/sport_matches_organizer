const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const { errorMiddleware } = require('./middleware/errorMiddlewareHandler');
const routes = require('./routes/mainRouter');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());

app.use('/', routes);
app.use(errorMiddleware);

module.exports = app;
