/* eslint-disable no-await-in-loop */
import AuthorizedApps from '../../models/AuthorizedApps';
import ActionPerformer from '../../controller/ActionPerformer';

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const SlackTriggerDispatcher = async (relays, event, authedUsers) => {
  for (const relay of relays) {
    for (const participantApp of relay.participantApps) {
      if (participantApp.eventType === 'Trigger') {
        const authDetails = await getCredentialsFromAuthedApps(participantApp.authentication);
        const userId = authDetails.credentials.get('slackUserId');

        if (authedUsers.includes(userId)) {
          let inputMatch = true;

          for (const [inputName, inputValue] of participantApp.inputs) {
            if (event[inputName] !== inputValue) {
              inputMatch = false;
            }
          }

          if (inputMatch) {
            ActionPerformer.ActionPerformer(relay, event);
          }
        }
      }
    }
  }
};

export default SlackTriggerDispatcher;
