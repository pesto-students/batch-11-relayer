import request from 'request';

const slackEventHandler = (webhookBody) => {
  const requestOptions = {
    url: 'https://slack.com/api/chat.postMessage',
    json: {
      message: 'Echo',
      channel: webhookBody.event.channel,
    },
  };
  request(requestOptions);
};
module.exports = {
  slackEventHandler,
};
