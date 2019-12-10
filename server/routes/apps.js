import express from 'express';
import AppsController from '../controller/AppsController';

const router = express.Router();

/* GET home page. */

router.get('/apps', AppsController.getApps);
router.get('/apps/:appName', AppsController.getEventDetails);
router.get('/apps/:appName/authorizedAccounts', AppsController.getAuthorizedAccounts);

module.exports = {
  path: '/api/v1',
  router,
};
