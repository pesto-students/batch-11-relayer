import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AuthorizedApps = new Schema({
  userId: { type: String, required: true },
  authAppId: { type: String, default: shortid.generate, unique: true },
  appName: { type: String, required: true },
  email: { type: String }, //  required: true
  credentials: { type: Map, of: String },
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
