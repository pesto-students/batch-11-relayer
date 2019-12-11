/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import IntegrationConfig from '../integrationConfig';
import AuthorizedApps from '../../models/AuthorizedApps';
import RelayHistory from '../../models/RelayHistory';

const getCredentialAttributeFromArray = (authDetails, attributeName) => {
  for (const attributeObject of authDetails.credentials) {
    if (attributeObject.attributeName === attributeName) {
      return [attributeObject.attributeName, attributeObject.attributeValue];
    }
  }
  return null;
};

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const getInputsFromDB = async (_id) => Inputs.findOne(_id).select({ _id: 0 });

const SlackActionPerformer = async (relay, action, triggerEvent) => {
  for (const slackEvent of IntegrationConfig.Slack.Events) {
    if (slackEvent.EventName === action.event) {
      const authDetails = await getCredentialsFromAuthedApps(action.authentication);
      const token = getCredentialAttributeFromArray(authDetails, 'access_token')[1];
      const userInputs = await getInputsFromDB(action.inputs);
      userInputs.token = token;

      // validate event in config and triggerevent

      const { url, method } = slackEvent.ApiToInvoke;
      const axiosOptions = {
        url,
        method,
        headers: { Authorization: `Bearer ${token}` },
        data: userInputs, // if user gives placeholder,
        // inputs should be filled from triggerEvent
      };

      const relayHistory = {};
      relayHistory.relayId = relay._id;

      axios(axiosOptions)
        .then(() => {
          relayHistory.status = 'Success';
        })
        .catch(() => {
          relayHistory.status = 'Failed';
        }).finally(() => {
          RelayHistory.create(relayHistory);
        });
    }
  }
};

export default SlackActionPerformer;
