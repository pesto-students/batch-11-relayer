import responseLib from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import IntegrationConfig from '../thirdparty/integrationConfig';
import AuthorizedApps from '../models/AuthorizedApps';

const getApps = (req, res) => {
  const appsAndEvents = [];
  for (const [appName, appData] of Object.entries(IntegrationConfig)) {
    const singleAppDetails = { Trigger: [], Action: [] };
    singleAppDetails.AppName = appName;
    singleAppDetails.Icon = appData.icon_path;
    for (const event of appData.Events) {
      singleAppDetails[event.EventType].push(event.EventName);
    }
    appsAndEvents.push(singleAppDetails);
  }

  const generatedResponse = responseLib.generateResponse(false, actionStatus.SUCCESS,
    'Apps and Events', appsAndEvents);
  res.send(generatedResponse);
};

const getEventDetails = (req, res) => {
  let eventDetails;
  for (const event of IntegrationConfig[req.params.appName].Events) {
    if (event.EventName === req.query.eventName) {
      eventDetails = event;
    }
  }

  const generatedResponse = responseLib.generateResponse(false, actionStatus.SUCCESS,
    'Event Details', eventDetails);
  res.send(generatedResponse);
};

const getAuthorizedAccounts = async (req, res) => {
  const authorizedAccountsForApp = await AuthorizedApps.find({
    userId: req.userId,
    appName: req.params.appName,
  }).select({
    _id: 0,
    appName: 1,
    email: 1,
    credentials: 1,
  });

  const generatedResponse = responseLib.generateResponse(false, actionStatus.SUCCESS,
    'Authorized accounts for app', authorizedAccountsForApp);
  res.send(generatedResponse);
};

module.exports = {
  getApps,
  getEventDetails,
  getAuthorizedAccounts,
};
