import { Router } from 'express';
import AuthController from '../controller/authController';

const router = Router();

router.get('/api/v1/authorize/:appName', AuthController.renderAuthRequestPage);

router.get('/auth/slack/callback', AuthController.slackAuthGrant);

router.get('/auth/github/callback', AuthController.githubAuthGrant);

export default router;
