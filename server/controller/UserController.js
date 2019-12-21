/* eslint-disable import/named */
import mongoose from 'mongoose';
import response from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';
import { hashPassword, comparePassword } from '../lib/passwordLib';
import { createAuthToken } from '../lib/authTokenLib';
import '../lib/cryptoLib';

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
  const { userId } = await UsersCollection.create(userObject);
  const authToken = createAuthToken(userId);
  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'Signup Successful', { authToken });
  res.cookie('authToken', authToken, { httpOnly: true, maxAge: 86400000 });
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
  const isPasswordMatched = await comparePassword(password, retrievedUser.password);
  if (!isPasswordMatched) {
    const generatedResponse = response.generateResponse(true, actionStatus.NOT_ALLOWED, 'Either Email or Password Is Wrong', null);
    res.send(generatedResponse);
  } else {
    const authToken = createAuthToken(retrievedUser.userId);
    const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'Login Successful', {
      userId: retrievedUser.userId,
      email: retrievedUser.email,
    });
    res.cookie('authToken', authToken, { httpOnly: true, maxAge: 86400000 });
    res.send(generatedResponse);
  }
};

const getAuthenticatedUserDetails = async (req, res) => {
  const { userId } = req;
  const retrievedUser = await UsersCollection.findOne({ userId }, { password: 0, _id: 0 });
  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'User Fetched', retrievedUser);
  res.send(generatedResponse);
};
const signOut = (req, res) => {
  res.clearCookie('authToken');
  const generatedResponse = response.generateResponse(false, actionStatus.SUCCESS, 'Logged Out', null);
  res.send(generatedResponse);
};
module.exports = {
  createUser,
  signIn,
  getAuthenticatedUserDetails,
  signOut,
};
