import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const Events = new Schema(
  {
    eventId: { type: String, default: shortid.generate },
    appId: { type: Schema.Types.ObjectId, ref: 'Apps' },
    appApiUrl: { type: String, required: true },
    appApiVersion: Number,
    inputsNeeded: [{ type: String }],
    outputsWeGet: [{ type: String }],
  },
);

const Apps = new Schema(
  {
    appId: { type: String, default: shortid.generate },
    name: { type: String, required: true, unique: true },
    events: [Events],
  },
);

mongoose.model('Apps', Apps);
