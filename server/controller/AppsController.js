import mongoose from 'mongoose';
import responseLib from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';

const AppsCollection = mongoose.model('Apps');

const createApp = async (req, res) => {
  console.log(req.body)
  const createdApp = await AppsCollection.create(req.body);
  res.send(createdApp);
};
const getAllApp = async (req, res) => {
  const fetchedAppList = await AppsCollection.find({});
  const generatedResponse = responseLib.generateResponse(false, actionStatus.SUCCESS, 'List Generated', fetchedAppList);
  res.send(generatedResponse);
};
module.exports = {
  createApp,
  getAllApp,
};
