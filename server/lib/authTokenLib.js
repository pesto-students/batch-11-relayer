import jwt from 'jsonwebtoken';
import time from './timeLib';

const { JWT_SECRET } = process.env;

const createAuthToken = (userId) => {
  const jwtTokenObject = {
    userId,
    iat: time.now(),
  };
  const jwtToken = jwt.sign(jwtTokenObject, JWT_SECRET, { expiresIn: 3600 });
  return jwtToken;
};

const validateAuthToken = () => {

};

module.exports = {
  createAuthToken,
  validateAuthToken,
};
