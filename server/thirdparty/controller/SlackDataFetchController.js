/* eslint-disable no-await-in-loop */
import axios from 'axios';
import IntegrationConfig from '../integrationConfig';
import AuthorizedApps from '../../models/AuthorizedApps';
import logger from '../../utils/logger';
import response from '../../lib/responseLib';
import * as actionStatus from '../../constants/actionStatus';

const getCredentialsFromAuthedApps = async (_id) => AuthorizedApps.findOne(_id);

const fetchData = async (apiDetails, authToken) => {
  const { url, method, urlParams } = apiDetails;
  let resp;
  const axiosOptions = {
    url,
    method,
    headers: { Authorization: `Bearer ${authToken}` },
    params: urlParams,
  };

  try {
    resp = await axios(axiosOptions);
  } catch (err) {
    logger.error(err);
  }

  return resp;
};

const getFromConfig = async (req) => {
  const {
    AppName,
    EventName,
    DetailName,
    AppAuthId,
  } = req.body;

  let resp;
  const authDetails = await getCredentialsFromAuthedApps({ _id: AppAuthId });
  const token = authDetails.authToken;


  for (const event of IntegrationConfig[AppName].Events) {
    if (event.EventName === EventName && event.OutputsWeGet) {
      resp = await fetchData(event.OutputsWeGet[DetailName], token);
      break;
    }
    if (event.EventName === EventName && event.InputsWeNeed) {
      resp = await fetchData(event.InputsWeNeed[DetailName], token);
      break;
    }
  }
  return resp;
};

const parseResponse = ({ data }, DetailName) => {
  if (DetailName === 'channel') {
    return data.channels;
  }
  return data;
};

const SlackDataFetchController = async (req, res) => {
  let generatedResponse;
  const { AppName, EventName, DetailName } = req.body;
  const responseData = [];

  const resp = await getFromConfig(req);
  const parsedResponse = parseResponse(resp, DetailName);

  if (resp) {
    for (const data of parsedResponse) {
      const { id, name } = data;
      responseData.push({ id, name });
    }

    generatedResponse = response.generateResponse(false, actionStatus.SUCCESS,
      `Details of ${AppName}:${EventName}`, responseData);
  } else {
    generatedResponse = response.generateResponse(false, actionStatus.NOT_FOUND,
      `Details of ${AppName}:${EventName}`, responseData);
  }

  res.send(generatedResponse);
};

export default SlackDataFetchController;
