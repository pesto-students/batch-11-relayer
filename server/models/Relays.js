import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const RelayParticipantApp = new Schema(
  {
    appName: { type: String },
    event: { type: String, required: true },
    eventType: { type: String, required: true },
    inputs: { type: Map },
    authentication: { type: Schema.Types.ObjectId, ref: 'AuthenticatedApps' },
  },
);

const Relays = new Schema(
  {
    relayId: { type: String, default: shortid.generate },
    relayName: { type: String, required: true },
    participantApps: [RelayParticipantApp],
    isRunning: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Relays', Relays);
