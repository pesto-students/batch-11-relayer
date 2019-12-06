import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.get('/authorize/:appName', AuthController.renderAuthRequestPage);

router.get('/slack/events', AuthController.slackAuthGrant);

router.get('/github/events', AuthController.githubAuthGrant);

export default router;
