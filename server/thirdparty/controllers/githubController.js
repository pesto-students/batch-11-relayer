import slackLib from '../lib/slackLib';

const githubWebHookHandler = (req, res) => {
  console.log(req.body);
  slackLib.slackEventHandler(req.body);
  res.send({ status: 'OK' });
};
module.exports = {
  githubWebHookHandler,
};
