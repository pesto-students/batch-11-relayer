import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const AttributeObject = new Schema(
  {
    attributeName: String,
    attributeValue: Schema.Types.Mixed,
    attributeType: { type: String },
  }, { _id: false },
);

const AuthorizedApps = new Schema({
  userId: { type: String }, // required:true
  authAppId: { type: String, default: shortid.generate, unique: true },
  appName: { type: String, required: true },
  credentials: [AttributeObject],
  version: { type: String, default: '' },
  configurationOptions: [AttributeObject],
});

export default mongoose.model('AuthorizedApps', AuthorizedApps);
