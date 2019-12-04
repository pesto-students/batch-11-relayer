const logger = require('pino')();

const info = (message) => logger.info(message);
const error = (message) => logger.error(message);
module.exports = {
  info,
  error,
};
