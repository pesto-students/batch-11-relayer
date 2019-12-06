import express from 'express';
import appsController from '../controller/AppsController';

const router = express.Router();

/* GET home page. */

router.get('/get/all', appsController.getAllApp);
router.post('/create', appsController.createApp);
module.exports = {
  path: '/app',
  router,
};
