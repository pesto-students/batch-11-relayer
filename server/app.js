import createError from 'http-errors';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import requireAll from 'require-all';
import pino from 'express-pino-logger';
import cors from 'cors';
import logger from './utils/logger';

dotenv.config();

const app = express();
const modelDirPath = path.join(__dirname, 'models');
const routeDirPath = path.join(__dirname, 'routes');

app.use(pino());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
requireAll(modelDirPath);
const routes = requireAll(routeDirPath);
app.use(cors({ origin: '*' }));
// eslint-disable-next-line no-restricted-syntax
for (const route in routes) {
  if (Object.prototype.hasOwnProperty.call(routes, route)) {
    const routeObject = routes[route];
    app.use(routeObject.path, routeObject.router);
  }
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
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
mongoose.connect(process.env.MONGO_URL || process.env.DB_HOST, {
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
