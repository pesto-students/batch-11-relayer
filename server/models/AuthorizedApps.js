import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AuthorizedApps = new Schema({
  OAuthId: { type: String, default: shortid.generate },
  userId: { type: String, required: true },
  appName: { type: String, required: true },
  authToken: { type: String, required: true },
  credentials: { type: Map },
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
