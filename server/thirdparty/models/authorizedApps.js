import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AttributeObject = new Schema(
  {
    attributeName: String,
    attributeValue: String,
  }, { _id: false, timestamps: true },
);

const AuthorizedApps = new Schema({
  userId: { type: String, unique: true },
  authAppId: { type: String, default: shortid.generate, unique: true },
  appName: { type: String, required: true },
  credentials: [AttributeObject],
  version: { type: String, default: '' },
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
