import mongoose, { Schema } from 'mongoose';

const AuthorizedApps = new Schema({
  userId: { type: String, required: true },
  appName: { type: String, required: true },
  authToken: { type: String, required: true },
  credentials: { type: Map },
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
