import createError from 'http-errors';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import requireAll from 'require-all';
import pino from 'express-pino-logger';
// import cors from 'cors';
import logger from './utils/logger';
import AuthenticationMiddleware from './middlewares/authentication';
import authorize from './thirdparty/routes/authorize';
import slackRouter from './thirdparty/routes/slackRouter';
import IntegrationService from './controller/IntegrationService';
import dataFetcher from './thirdparty/routes/DataFetcher';


dotenv.config();
const app = express();

const modelDirPath = path.join(__dirname, 'models');
const routeDirPath = path.join(__dirname, 'routes');
const publicFolder = path.join(__dirname, '../assets');
requireAll(modelDirPath);
const routes = requireAll(routeDirPath);


app.use(pino());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicFolder));

app.use('/', (req, res, next) => {
  if (req.headers.origin !== undefined) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, *');
  res.setHeader('Access-Control-Max-Age', '7200');

  if (req.method === 'OPTIONS') {
    res.send();
  } else {
    next();
  }
});
app.use('/api/v1', AuthenticationMiddleware);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/thirdparty/views'));
// app.use(cors({ origin: '*' }));

for (const route in routes) {
  if (Object.prototype.hasOwnProperty.call(routes, route)) {
    const routeObject = routes[route];
    app.use(routeObject.path, routeObject.router);
  }
}


app.use('/', authorize);
app.use(slackRouter.path, slackRouter.router);
app.use('/api/v1', dataFetcher);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

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
  IntegrationService();
});

module.exports = app;
