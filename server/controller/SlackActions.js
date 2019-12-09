import IntegrationConfig from '../thirdparty/integrationConfig';

const SlackActionSink = (relays, event, authedUsers) => {
  for (const relay of relays) {
    for (const participantApp of relay.participantApps) {
      if (participantApp.eventType === 'Action') {

      }
    }
  }
};

export default SlackActionSink;
