import mongoose, { Schema } from 'mongoose';

const RelayHistory = new Schema({
  relayId: { type: String, unique: true },
  status: { type: String },
}, { timestamps: true });

export default mongoose.model('RelayHistory', RelayHistory);
