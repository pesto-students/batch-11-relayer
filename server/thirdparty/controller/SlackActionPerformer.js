/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import IntegrationConfig from '../integrationConfig';
import AuthorizedApps from '../../models/AuthorizedApps';
import RelayHistory from '../../models/RelayHistory';

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const SlackActionPerformer = async (relayId, action, triggerEvent) => {
  for (const slackEvent of IntegrationConfig.Slack.Events) {
    if (slackEvent.EventName === action.event) {
      const authDetails = await getCredentialsFromAuthedApps(action.authentication);
      const token = authDetails.authToken;

      const actionInputs = { token };

      for (const [inputName, inputValue] of action.inputs) {
        if (typeof inputValue !== 'object') {
          actionInputs[inputName] = inputValue;
        } else if (inputValue.fromTrigger === true) {
          actionInputs[inputName] = triggerEvent[inputName];
        } else {
          actionInputs[inputName] = inputValue.data;
        }
      }

      const { url, method } = slackEvent.ApiToInvoke;
      const axiosOptions = {
        url,
        method,
        headers: { Authorization: `Bearer ${token}` },
        data: actionInputs,
      };

      const relayHistory = { relayId };

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
