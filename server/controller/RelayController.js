/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import RelayCollection from '../models/Relays';
import AuthorizedApps from '../models/AuthorizedApps';
import RelayHistory from "../models/RelayHistory";

const getCriteria = (criteria) => {
  const filter = {};
  if (criteria.deleted) {
    filter.isDeleted = criteria.deleted === 'true';
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
  const relayDetails = req.body;
  relayDetails.userId = req.userId;

  const createdRelay = await RelayCollection.create(relayDetails);

  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS,
    'Created relay', createdRelay);

  res.send(generatedResponse);
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
  relayIDToBeDeleted._id = req.params.relayId;
  relayIDToBeDeleted.userId = req.userId;

  const deletedRelayDetails = await RelayCollection.findOneAndUpdate(relayIDToBeDeleted,
    { isDeleted: false });

  const generatedResponse = response.generateResponse(false,
    actionStatus.SUCCESS, 'Deleted relay', deletedRelayDetails);

  res.send(generatedResponse);
};

const getRelayLog = async(req,res) => {
  const skipNumber = req.query.page ? req.query.page * 10 : 0 ;
  const relayLog = await RelayHistory.find({relayId: req.query.relayId},{_id:0,__v:0})
      .sort('-createdAt')
      .limit(10)
      .skip(skipNumber)
      .lean();
  const generatedResponse = !relayLog ?
      response.generateResponse(false,'No Log Found',actionStatus.NOT_FOUND,null):
      response.generateResponse(false,'Log Data Found',actionStatus.SUCCESS,relayLog);
  res.send(generatedResponse);
}
module.exports = {
  getRelays,
  getSingleRelay,
  getRunningRelays,
  getRunningRelaysWithTriggerApp,
  createNewRelay,
  updateExistingRelay,
  moveRelayToTrash,
  getRelayLog
};
