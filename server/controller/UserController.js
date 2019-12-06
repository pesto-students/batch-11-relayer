/* eslint-disable import/named */
import mongoose from 'mongoose';
import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import { hashPassword, comparePassword } from '../lib/passwordLib';
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
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const retrievedUser = await UsersCollection.findOne({ email });
  if (!retrievedUser) {
    const generatedResponse = response.generateResponse(true, actionStatus.NOT_ALLOWED, 'Either Email or Password Is Wrong', null);
    res.send(generatedResponse);
    return;
  }
  const isPasswordMatched = comparePassword(password, retrievedUser.password);
  if (!isPasswordMatched) {
    const generatedResponse = response.generateResponse(true, actionStatus.NOT_ALLOWED, 'Either Email or Password Is Wrong', null);
    res.send(generatedResponse);
  }
  const authToken = createAuthToken(retrievedUser.userId);
  const generatedResponse = response.generateResponse(true, actionStatus.SUCCESS, {
    userId: retrievedUser.userId,
    email: retrievedUser.email,
    authToken,
  });
  res.send(generatedResponse);
};
module.exports = {
  createUser,
  signIn,
};
