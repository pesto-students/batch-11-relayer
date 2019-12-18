import eventEmitter from '../lib/eventsLib';
import WebHookListeners from './WebHookListeners';
import ActionPerformer from './ActionPerformer';

const InitializeIntegrationService = async () => {
  eventEmitter.on('slackWebHook', WebHookListeners.slackWebHookListener);
  eventEmitter.on('slackActionPerformer', ActionPerformer.slackActionPerformer);
  eventEmitter.on('githubActionPerformer', ActionPerformer.githubActionPerformer);
};

export default InitializeIntegrationService;
