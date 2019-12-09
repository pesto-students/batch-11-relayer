
import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import RelayCollection from '../models/Relays';

const getCriteria = (criteria) => {
  const filter = {};
  if (criteria.deleted) {
    filter.isDeleted = criteria.deleted === 'true';
  }
  if (criteria.published) {
    filter.isPublished = criteria.published === 'true';
  }
  if (criteria.running) {
    filter.isRunning = criteria.running === 'true';
  }
};

const relayQuery = async (filter, selectObject = {
  _id: 0,
  relayName: 1,
  isRunning: 1,
  isDeleted: 1,
  isPublished: 1,
  participantApps: 1,
}) => RelayCollection.find(filter)
  .select(selectObject);

const getRunningRelays = async () => relayQuery({ isRunning: true });

const getRunningRelaysWithTriggerApp = async (appName) => {
  const filter = {
    isRunning: true,
    'participantApps.appName': appName,
    'participantApps.eventType': 'Trigger',
  };
  const select = {
    _id: 1,
    participantApps: 1,
  };
  return relayQuery(filter, select);
};

const getRelays = async (req, res) => {
  const filter = getCriteria(req.query);
  // filter.userId = req.userId;
  const relays = await relayQuery(filter);
  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'List of relays', relays);
  res.send(generatedResponse);
};


module.exports = {
  getRelays,
  getRunningRelays,
  getRunningRelaysWithTriggerApp,
};
