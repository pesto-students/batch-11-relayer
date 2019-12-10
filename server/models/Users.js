import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;

const User = new Schema(
  {
    userId: { type: String, default: shortid.generate },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true },
);
export default mongoose.model('User', User);
