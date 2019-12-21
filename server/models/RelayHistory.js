import mongoose, { Schema } from 'mongoose';

const RelayHistory = new Schema({
  relayId: { type: String },
  status: { type: String },
  message:{ type: String}
}, { timestamps: true });

export default mongoose.model('RelayHistory', RelayHistory);
