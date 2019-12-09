import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const Events = new Schema(
  {
    eventId: { type: String, default: shortid.generate },
    appApiUrl: { type: String, required: true },
    appApiVersion: { type: String },
    inputsNeeded: [{ type: String }],
    outputsWeGet: [{ type: String }],
  }, { _id: false, timestamps: true },
);

const Apps = new Schema(
  {
    appId: { type: String, default: shortid.generate },
    name: { type: String, required: true, unique: true },
    events: [Events],
  },
);

mongoose.model('Apps', Apps);
