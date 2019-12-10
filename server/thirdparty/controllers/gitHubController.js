import eventEmitter from '../../lib/eventsLib';
import '../../lib/githubEventLib';
import auth from '../../lib/authTokenLib';

const webHookExecutor = (req, res) => {
  const payload = req.body;
  switch (payload.action) {
    default: {
      res.send({ status: 'Ok' });
    }
  }
};
const authCallBackHandler = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { state } = req.query;
  const decodedStateDetails = await auth.decodeGenericAuthToken(state);
  eventEmitter.emit('Github:Authorize', { ...req.query, state: decodedStateDetails });
  res.send('OK');
};
module.exports = {
  webHookExecutor,
  authCallBackHandler,
};
