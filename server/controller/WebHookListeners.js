import RelayController from './RelayController';
import SlackTriggerDispatcher from '../thirdparty/controller/SlackTriggerDispatcher';
import { performGithubActionOnSlackTrigger } from '../thirdparty/controller/githubHandler';

const slackWebHookListener = async (event, authedUsers) => {
  //const slackTriggeredRelays = await RelayController.getRunningRelaysWithTriggerApp('Slack');
  if (event && event.text && event.text.split(':')[0] === 'github') performGithubActionOnSlackTrigger(event, authedUsers);
  // if (slackTriggeredRelays.length !== 0) {
  //   setImmediate(SlackTriggerDispatcher, slackTriggeredRelays, event, authedUsers);
  // }
};

const exports = {
  slackWebHookListener,
};

export default exports;
