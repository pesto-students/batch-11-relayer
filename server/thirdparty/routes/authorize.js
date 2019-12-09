import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.get('/authorize/:appName', AuthController.renderAuthRequestPage);

router.get('/auth/slack/callback', AuthController.slackAuthGrant);

router.get('/auth/github/callback', AuthController.githubAuthGrant);

export default router;
