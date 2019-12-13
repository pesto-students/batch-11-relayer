import RelayController from './RelayController';
import SlackTriggerDispatcher from '../thirdparty/controller/SlackTriggerDispatcher';

const slackWebHookListener = async (event, authedUsers) => {
  const slackTriggeredRelays = await RelayController.getRunningRelaysWithTriggerApp('Slack');

  if (slackTriggeredRelays.length !== 0) {
    setImmediate(SlackTriggerDispatcher, slackTriggeredRelays, event, authedUsers);
  }
};

const exports = {
  slackWebHookListener,
};

export default exports;
