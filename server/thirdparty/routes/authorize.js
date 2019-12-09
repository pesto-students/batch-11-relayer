import { Router } from 'express';
import AuthController from '../controllers/authController';
import GithubController from '../controllers/githubController';
import SlackController from '../controllers/slackController';


const router = Router();

router.get('/authorize/:appName', AuthController.renderAuthRequestPage);
router.get('/authorizeapp/github', (req, res) => {
  res.redirect('https://github.com/apps/relayer-test/installations/new?state=123456');
});
router.get('/slack/events', AuthController.slackAuthGrant);

router.get('/github/events', AuthController.githubAuthGrant);
router.post('/thirdparty/github/webhook', GithubController.githubWebHookHandler);
router.post('/thirdparty/slack/webhook', SlackController.handleSlackEvents);


export default router;
