import request from 'request';
import logger from '../utils/logger'
const makeRequest = async (options) => new Promise((resolve, reject) => {
  options.headers = { ...options.headers,'User-Agent': 'Relayer/1.0.0',Accept:'application/json' };
  request(options, (err, response, responseBody) => {
    if (err) return reject(err);
    if (response.statusCode === 200 || response.statusCode === 201) {
      try {
        resolve(JSON.parse(responseBody));
      } catch (e) {
        logger.error(e)
        resolve(responseBody);
      }
    } else {
      logger.error(responseBody)
      reject(new Error(JSON.stringify(responseBody)));
    }
  });
});

export default makeRequest;
