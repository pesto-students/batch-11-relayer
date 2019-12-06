import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const RelayParticipantApp = new Schema(
  {
    appId: { type: String, required: true },
    appName: { type: String },
    activationTrigger: { type: String, required: true },
    authentication: { type: Schema.Types.ObjectId, ref: 'AuthenticatedApps' },
    event: { type: String, required: true },
    inputs: { type: Schema.Types.ObjectId, ref: 'Inputs' },
  },
  { timestamps: true },
);

const Relays = new Schema({
  relayId: { type: String, default: shortid.generate },
  participantApp: [RelayParticipantApp],
  status: { type: String, default: String },
  isPublished: { type: Boolean, default: true },
  userId: { type: String, required: true}
});
mongoose.model('Relays', Relays);
