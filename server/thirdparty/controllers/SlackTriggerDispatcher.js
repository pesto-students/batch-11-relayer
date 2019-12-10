/* eslint-disable no-await-in-loop */
import AuthorizedApps from '../../models/AuthorizedApps';
import ActionPerformer from '../../controller/ActionPerformer';

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const getCredentialAttributeFromArray = (authDetails, attributeName) => {
  for (const attributeObject of authDetails.credentials) {
    if (attributeObject.attributeName === attributeName) {
      return [attributeObject.attributeName, attributeObject.attributeValue];
    }
  }
  return null;
};

const SlackTriggerDispatcher = async (relays, event, authedUsers) => {
  for (const relay of relays) {
    for (const participantApp of relay.participantApps) {
      if (participantApp.eventType === 'Trigger') {
        console.log(participantApp);
        const authDetails = await getCredentialsFromAuthedApps(participantApp.authentication);
        const userId = getCredentialAttributeFromArray(authDetails, 'user_id')[1];
        if (authedUsers.includes(userId)) {
          ActionPerformer.ActionPerformer(relay, event);
        }
      }
    }
  }
};

export default SlackTriggerDispatcher;
