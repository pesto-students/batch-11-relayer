import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AuthorizedApps = new Schema({
  userId: { type: String, required: true },
  authAppId: { type: String, default: shortid.generate, unique: true },
  appName: { type: String, required: true },
  email: { type: String }, //  required: true
  auth_token: { type: String },
  credentials: { type: Map },
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
