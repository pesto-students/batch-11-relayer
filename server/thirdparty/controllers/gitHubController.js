import eventEmitter from '../../lib/eventsLib';
import '../../lib/slackEventLib';

const webHookExecutor = (req, res) => {
  const payload = req.body;
  switch (payload.action) {
    case 'created': {
      if (Object.prototype.hasOwnProperty.call(payload, 'installation')) {
        eventEmitter.emit('Github:Authorize:Init', payload);
      }
      break;
    }
    default: {
      break;
    }
  }
  res.send({ status: 'Ok' });
};
module.exports = {
  webHookExecutor,
};
