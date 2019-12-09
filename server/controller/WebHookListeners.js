import RelayController from './RelayController';
import SlackActionSink from './SlackActions';

const slackWebHookListener = async (event, authedUsers) => {
  const slackTriggeredRelays = await RelayController.getRunningRelaysWithTriggerApp('Slack');

  setImmediate(SlackActionSink, slackTriggeredRelays, event, authedUsers);
};

const gitWebHookListener = (event) => {
  console.log(event);
};

const exports = {
  slackWebHookListener,
  gitWebHookListener,
};

export default exports;
