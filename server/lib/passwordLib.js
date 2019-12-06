import bcrypt from 'bcrypt';

const SALT_ROUND = 10;
module.exports.hashPassword = (plainText) => new Promise((resolve, reject) => {
  bcrypt.hash(plainText, SALT_ROUND, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  });
});
