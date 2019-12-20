import responseLib from '../../lib/responseLib';
import * as actionStatus from '../../constants/actionStatus';
import eventEmitter from '../../lib/eventsLib';

const slackController = (req, res) => {
  const { challenge } = req.body;
  const response = responseLib.generateResponse(false, 200, actionStatus.SUCCESS, { challenge });
  eventEmitter.emit('slackWebHook', req.body.event, req.body.authed_users);

  res.send(response);
};

export default slackController;
