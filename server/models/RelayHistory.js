import mongoose, { Schema } from 'mongoose';

const RelayHistory = new Schema({
  relayId: { type: String, unique: true },
  status: { type: String },
}, { timestamps: true });
mongoose.model('RelayHistory', RelayHistory);
