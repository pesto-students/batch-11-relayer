import bcrypt from 'bcrypt';

const SALT_ROUND = 10;
module.exports.hashPassword = (plainText) => new Promise((resolve, reject) => {
  bcrypt.hash(plainText, SALT_ROUND, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  });
});
module.exports.comparePassword = (plainText, hashedText) => new Promise((resolve, reject) => {
  bcrypt.compare(plainText, hashedText, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});
