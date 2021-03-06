/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import RelayCollection from '../models/Relays';
import AuthorizedApps from '../models/AuthorizedApps';
import RelayHistory from '../models/RelayHistory';
import logger from '../utils/logger';

const getCriteria = (criteria) => {
  const filter = {};
  if (criteria.isDeleted) {
    filter.isDeleted = criteria.isDeleted === 'true';
  }
  if (criteria.isRunning) {
    filter.isRunning = criteria.isRunning === 'true';
  }
  return filter;
};

const relayQuery = async (filter, selectObject = {
  _id: 1,
  relayName: 1,
  isRunning: 1,
  isDeleted: 1,
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
  filter.userId = req.userId;

  const relays = await relayQuery(filter, {
    relayName: 1,
    isRunning: 1,
    isDeleted: 1,
    relayId: 1,
    'participantApps.appName': 1,
    'participantApps.event': 1,
    'participantApps.eventType': 1,
    createdAt: 1,
    updatedAt: 1,
  });

  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS,
    'List of relays', relays);

  res.send(generatedResponse);
};

const fetchAuth = async (app) => {
  const auth = {};

  if (app.authentication) {
    auth.authentication = await AuthorizedApps.findOne(app.authentication, { _id: 0 });
  }

  return auth;
};

const getSingleRelay = async (req, res) => {
  const filter = {};
  filter._id = req.params.relayId; // _id or shortid
  filter.userId = req.userId;

  const singleRelay = await RelayCollection.findOne(filter, {
    relayName: 1,
    isRunning: 1,
    isDeleted: 1,
    participantApps: 1,
  });

  for (const [index, app] of Object.entries(singleRelay.participantApps)) {
    const auth = await fetchAuth(app);
    const { appName, event, eventType } = app;
    singleRelay.participantApps[index] = {
      appName,
      event,
      eventType,
      ...auth,
    };
  }

  const generatedResponse = response.generateResponse(false,
    actionStatus.SUCCESS, 'Relay details', singleRelay);
  res.send(generatedResponse);
};

// validate entries, or get participantApp.authentication wholly instead of id
const createNewRelay = async (req, res) => {
  try {
    const relayDetails = req.body;
    relayDetails.userId = req.userId;
    const createdRelay = await RelayCollection.create(relayDetails);

    const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS,
      'Created relay', createdRelay);

    res.send(generatedResponse);
  } catch (err) {
    logger.error(err);
    const generatedResponse = response.generateResponse(true, actionStatus.FAILED, 'Error', err);
    res.send(generatedResponse);
  }
};

const updateExistingRelay = async (req, res) => {
  const relayIDToBeEdited = {};
  relayIDToBeEdited._id = req.params.relayId;
  relayIDToBeEdited.userId = req.userId;
  const relayDetailsToBeEdited = req.body;

  const editedRelayDetails = await RelayCollection.findOneAndUpdate(relayIDToBeEdited,
    relayDetailsToBeEdited);

  const generatedResponse = response.generateResponse(false,
    actionStatus.SUCCESS, 'Edited relay', editedRelayDetails);

  res.send(generatedResponse);
};

const moveRelayToTrash = async (req, res) => {
  const relayIDToBeDeleted = {};
  relayIDToBeDeleted.relayId = req.params.relayId;
  relayIDToBeDeleted.userId = req.userId;

  const deletedRelayDetails = await RelayCollection.findOneAndUpdate(relayIDToBeDeleted,
    { isDeleted: true });

  const generatedResponse = response.generateResponse(false,
    actionStatus.SUCCESS, 'Deleted relay', deletedRelayDetails);

  res.send(generatedResponse);
};

const getRelayLog = async (req, res) => {
  const skipNumber = req.query.page ? req.query.page * 10 : 0;
  const requestOptions = {
    userId: req.userId,
    isRunning: req.query.isRunning,
  };
  if (req.query.relayId) {
    requestOptions.relayId = req.query.relayId;
  }
  const relays = await RelayCollection.find(requestOptions, { participantApps: 0 }).lean();
  const relayLog = await RelayHistory.find({ relayId: { $in: relays.map((relay) => relay.relayId) } }, { _id: 0, __v: 0 })
    .sort('-createdAt')
    .limit(10)
    .skip(skipNumber)
    .lean();
  const merged = [];
  for (let i = 0; i < relayLog.length; i += 1) {
    merged.push({
      ...relayLog[i],
      ...(relays.find((itmInner) => itmInner.relayId === relayLog[i].relayId)),
    });
  }
  const generatedResponse = !relayLog
    ? response.generateResponse(false, 'No Log Found', actionStatus.NOT_FOUND, null)
    : response.generateResponse(false, 'Log Data Found', actionStatus.SUCCESS, merged);
  res.send(generatedResponse);
};
const changeRelayStatusToggle = async (req, res) => {
  try {
    const relay = await RelayCollection.findOne({
      relayId: req.query.relayId,
      userId: req.userId,
    });
    if (relay) {
      relay.isRunning = !relay.isRunning;
    }
    const updatedRelay = await relay.save();
    const generatedResponse = updatedRelay
      ? response.generateResponse(false, 'Status Updated', actionStatus.SUCCESS, updatedRelay)
      : response.generateResponse(true, 'Not Updated', actionStatus.FAILED, updatedRelay);
    res.send(generatedResponse);
  } catch (e) {
    const generatedResponse = response.generateResponse(true, 'Internal Error Occurred', actionStatus.FAILED, null);
    res.send(generatedResponse);
  }
};
module.exports = {
  getRelays,
  getSingleRelay,
  getRunningRelays,
  getRunningRelaysWithTriggerApp,
  createNewRelay,
  updateExistingRelay,
  moveRelayToTrash,
  getRelayLog,
  changeRelayStatusToggle,
};
