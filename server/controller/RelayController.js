import mongoose from 'mongoose';
import response from '../lib/responseLib.js';
import * as actionStatus from '../constants/actionStatus';

const RelayCollection = mongoose.model('RelayCollection');

const getMyRelays = async (req, res) => {
  const { userId } = req.user;
  const relayList = await RelayCollection.findOne({ userId, isPublished: true });
  if (relayList) {
    const generatedResponse = response.generateResponse(true, 200, actionStatus.NOT_FOUND, null);
    res.send(generatedResponse);
    return;
  }
  const generatedResponse = response.generateResponse(false, 200, actionStatus.SUCCESS, relayList);
  res.send(generatedResponse);
};
const toggleRelayStatus = async (req, res) => {
  const { relayId } = req.body;
  const retrievedRelay = await RelayCollection.findOne({ relayId, isPublished: true });
  if (retrievedRelay) {
    const generatedResponse = response.generateResponse(true, 200, actionStatus.NOT_FOUND, null);
    res.send(generatedResponse);
  }
  const toggledStatus = retrievedRelay.status === 'active' ? 'pause' : 'active';
  retrievedRelay.status = toggledStatus;
  const updatedRelay = await retrievedRelay.save();
  const generatedResponse = response.generateResponse(false, 200, actionStatus.SUCCESS, updatedRelay);
  res.send(generatedResponse);
};
module.exports = { getMyRelays , toggleRelayStatus };
