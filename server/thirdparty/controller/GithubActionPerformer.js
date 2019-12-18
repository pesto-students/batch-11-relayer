/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import IntegrationConfig from '../integrationConfig';
import AuthorizedApps from '../../models/AuthorizedApps';
import RelayHistory from '../../models/RelayHistory';

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const GithubActionPerformer = async (relayId, action, triggerEvent) => {
  for (const githubEvent of IntegrationConfig.Github.Events) {
    if (githubEvent.EventName === action.event) {
      const authDetails = await getCredentialsFromAuthedApps(action.authentication);
      const token = authDetails.authToken;
      const owner = authDetails.credentials.get('owner');

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

      const { method } = githubEvent.ApiToInvoke;
      const url = `${githubEvent.ApiToInvoke.url}/${owner}/${actionInputs.repo}/issues`;

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

export default GithubActionPerformer;
