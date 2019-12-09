import slackLib from '../lib/slackLib';

const githubWebHookHandler = (req, res) => {
  console.log('recieved Webhook')
  console.log(req.body);
  res.send({ status: 'OK' });
};
module.exports = {
  githubWebHookHandler,
};
