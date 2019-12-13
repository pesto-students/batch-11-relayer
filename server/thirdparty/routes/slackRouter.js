import { Router } from 'express';
import SlackController from '../controller/slackController';

const router = Router();

router.post('/slack/events', SlackController);

const exports = {
  path: '/',
  router,
};

export default exports;
