const cryptoJS = require('crypto-js');

const encryptionKey = process.env.CIPHER_KEY || '';

const encrypt = (payload) => {
  const payloadString = JSON.stringify(payload);
  const cypherObject = cryptoJS.AES.encrypt(payloadString, encryptionKey);
  const cypherText = cypherObject.toString();
  return cypherText;
};
const decrypt = (payload) => {
  const bytes = cryptoJS.AES.decrypt(payload, encryptionKey);
  const plainText = bytes.toString(cryptoJS.enc.Utf8);
  return JSON.parse(plainText);
};

export {
  encrypt,
  decrypt,
};
