import mongoose, { Schema } from 'mongoose';

const AttributeObject = new Schema(
  {
    attributeName: String,
    attributeValue: String,
  }, { _id: false },
);

const Inputs = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  userInputs: [AttributeObject],
});

export default mongoose.model('Inputs', Inputs);
