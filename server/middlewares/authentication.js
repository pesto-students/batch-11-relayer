import tokenLib from '../lib/authTokenLib';
import responseLib from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';

const validateAuthentication = async (req, res, next) => {
  try {
    const authToken = req.headers.cookie.split(';')
      .filter((el) => el.search('authToken') !== -1);
    const token = authToken[0].split('=')[1];
    const decoded = await tokenLib.verifyAuthToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (e) {
    const generatedResponse = responseLib.generateResponse(
      true,
      'Authentication Error',
      actionStatus.NOT_ALLOWED,
      null,
    );
    res.status(401).send(generatedResponse);
  }
};

module.exports = validateAuthentication;
