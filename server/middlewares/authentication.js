import tokenLib from '../lib/authTokenLib';
import responseLib from '../lib/responseLib';
import * as actionStatus from '../constants/actionStatus';

const validateAuthentication = async (req, res, next) => {
  try {
    const decoded = await tokenLib.getAuthCookie(req);
    req.userId = decoded.userId;
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

export default validateAuthentication;
