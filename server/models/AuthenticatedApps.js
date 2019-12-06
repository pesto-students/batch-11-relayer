import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AuthenticatedApp = new Schema({
  userId: { type: String, unique: true },
  authAppId: { type: String, default: shortid, unique: true },
  name: { type: String, required: true },
  credentials: [],
  version: { type: String, default: '' },
});
mongoose.model('AuthenticatedApp', AuthenticatedApp);
