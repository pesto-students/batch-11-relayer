import { Router } from 'express';
import gitHubController from '../controllers/gitHubController';

const router = Router();

router.post('/thirdparty/github/webhook', gitHubController.webHookExecutor);
router.get('/thirdparty/github/auth/callback', gitHubController.authCallBackHandler);
const exports = {
  path: '/',
  router,
};

export default exports;
