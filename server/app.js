/* eslint-disable import/no-dynamic-require */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const pino = require('express-pino-logger')();
const logger = require('./utils/logger');

const app = express();
const modelDirPath = path.join(__dirname, 'models');
const routeDirPath = path.join(__dirname, 'routes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
fs.readdirSync(modelDirPath).forEach((file) => {
  // eslint-disable-next-line global-require
  require(`${modelDirPath}/${file}`);
});

fs.readdirSync(routeDirPath).forEach((file) => {
  // eslint-disable-next-line global-require
  require(`${routeDirPath}/${file}`);
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('error', (err) => {
  logger.error(err);
});
mongoose.connection.on('connected', () => {
  logger.info('Connected To DB');
});

module.exports = app;
