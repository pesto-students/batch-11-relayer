import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import time from './timeLib';

dotenv.config();

const { JWT_SECRET } = process.env;

const createAuthToken = (userId) => {
  const jwtTokenObject = {
    userId,
    iat: time.now(),
  };
  const jwtToken = jwt.sign(jwtTokenObject, JWT_SECRET, { expiresIn: 3600 });
  return jwtToken;
};

const verifyAuthToken = (authToken) => new Promise((resolve, reject) => {
  jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

module.exports = {
  createAuthToken,
  verifyAuthToken,
};
