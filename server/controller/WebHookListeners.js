import RelayController from './RelayController';
import SlackTriggerDispatcher from '../thirdparty/controllers/SlackTriggerDispatcher';

const slackWebHookListener = async (event, authedUsers) => {
  const slackTriggeredRelays = await RelayController.getRunningRelaysWithTriggerApp('Slack');

  setImmediate(SlackTriggerDispatcher, slackTriggeredRelays, event, authedUsers);
};

const gitWebHookListener = (event) => {
  console.log(event);
};

const exports = {
  slackWebHookListener,
  gitWebHookListener,
};

export default exports;
