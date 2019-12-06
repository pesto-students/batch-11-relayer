/* eslint-disable import/named */
import mongoose from 'mongoose';
import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import { hashPassword } from '../lib/passwordLib';
import { createAuthToken } from '../lib/authTokenLib';

const UsersCollection = mongoose.model('User');
const createUserObject = async (email, password) => {
  const userObject = {
    email, password: await hashPassword(password),
  };
  return userObject;
};
const createUser = async (req, res) => {
  const { email, password } = req.body;
  const retrievedUser = await UsersCollection.findOne({ email });
  if (retrievedUser) {
    const generatedResponse = response.generateResponse(
      true,
      actionStatus.NOT_ALLOWED,
      200,
      'Already an user exists with same email',
    );
    res.send(generatedResponse);
    return;
  }
  const userObject = await createUserObject(email, password);
  const { userId } = UsersCollection.create(userObject);
  const authToken = createAuthToken(userId);
  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'Signup Successful', { authToken });
  res.send(generatedResponse);
};

module.exports = {
  createUser,
};
