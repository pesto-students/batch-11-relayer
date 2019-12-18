import axios from 'axios';
import AuthorizedApps from '../../models/AuthorizedApps';
import constants from '../constants/thirdPartyConstants';
import logger from '../../utils/logger';

const renderAuthRequestPage = (req, res) => {
  const appName = req.params.appName.toUpperCase();
  const { userId } = req;
  const authorizationRequestURL = `${constants[`${appName}_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_SCOPE`]}&${constants[`${appName}_REDIRECT_URL`]}&state=${userId}`;

  res.render('OAuthWindow', {
    authorizationRequestURL,
  });
};

const storeSlackCredentials = ({ data }, userId) => {
  const authorizedApp = {};
  authorizedApp.credentials = new Map();

  authorizedApp.appName = 'Slack';
  authorizedApp.userId = userId;
  authorizedApp.authToken = data.access_token;
  authorizedApp.credentials.set('slackUserId', data.user_id);
  authorizedApp.credentials.set('slackTeamId', data.team_id);
  authorizedApp.credentials.set('slackTeamName', data.team_name);

  return AuthorizedApps.create(authorizedApp);
};

const getGithubUsername = async (authToken) => {
  const axiosOptions = {
    url: 'https://api.github.com/user',
    method: 'GET',
    headers: { Authorization: `token ${authToken}` },
  };

  return axios(axiosOptions);
};

const storeGithubCredentials = async ({ data }, userId) => {
  const authorizedApp = {};
  authorizedApp.credentials = new Map();

  const { data: { name: owner } } = await getGithubUsername(data.access_token);

  authorizedApp.appName = 'Github';
  authorizedApp.userId = userId;
  authorizedApp.authToken = data.access_token;
  authorizedApp.credentials.set('githubTokenType', data.token_type);
  authorizedApp.credentials.set('owner', owner);


  return AuthorizedApps.create(authorizedApp);
};

const slackAuthGrant = async (req, res) => {
  const userId = req.query.state;
  const appName = 'SLACK';
  const authGrantURL = `${constants[`${appName}_AUTH_GRANT_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_CLIENT_SECRET`]}&code=${req.query.code}`;

  axios.get(authGrantURL)
    .then((response) => storeSlackCredentials(response, userId))
    .then(() => {
      res.render('authSuccess');
    })
    .catch((err) => {
      logger.error(err);
      res.render('authError');
    });
};

const githubAuthGrant = (req, res) => {
  const userId = req.query.state;
  const appName = 'GITHUB';
  const options = {
    url: `${constants[`${appName}_AUTH_GRANT_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_CLIENT_SECRET`]}&code=${req.query.code}`,
    method: 'POST',
    headers: { Accept: 'application/json' },
  };

  axios(options)
    .then((response) => storeGithubCredentials(response, userId))
    .then(() => {
      res.render('authSuccess');
    })
    .catch((err) => {
      logger.error(err);
      res.render('authError');
    });
};

const authController = {
  renderAuthRequestPage,
  slackAuthGrant,
  githubAuthGrant,
};

export default authController;
