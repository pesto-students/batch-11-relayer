import mongoose from 'mongoose';

const AppsCollection = mongoose.model('Apps');

const createApp = async () => {
  AppsCollection.create();
};

module.exports = {
  createApp,
};
