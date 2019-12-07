import axios from 'axios';
import AuthorizedApps from '../models/authorizedApps';
import constants from '../constants/thirdPartyConstants';

const renderAuthRequestPage = (req, res) => {
  const appName = req.params.appName.toUpperCase();
  const authorizationRequestURL = `${constants[`${appName}_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_SCOPE`]}&${constants[`${appName}_REDIRECT_URL`]}`;
  res.render('OAuthWindow', {
    authorizationRequestURL,
  });
};

const slackAuthGrant = (req, res) => {
  const appName = 'SLACK';
  const authGrantURL = `${constants[`${appName}_AUTH_GRANT_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_CLIENT_SECRET`]}&code=${req.query.code}`;
  axios.get(authGrantURL)
    .then((response) => {
      const authorizedApp = {
        userId: req.userId,
        appName,
        credentials: [{
          attributeName: 'access_token',
          attributeValue: response.data.access_token,
        }, {
          attributeName: 'user_id',
          attributeValue: response.data.user_id,
        }, {
          attributeName: 'team_id',
          attributeValue: response.data.team_id,
        }, {
          attributeName: 'team_name',
          attributeValue: response.data.team_name,
        }],
      };
      AuthorizedApps.create(authorizedApp);

      res.render('authSuccess');
    })
    .catch(() => {
      res.render('authError');
    });
};

const githubAuthGrant = (req, res) => {
  const appName = 'GITHUB';
  const options = {
    url: `${constants[`${appName}_AUTH_GRANT_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_CLIENT_SECRET`]}&code=${req.query.code}`,
    method: 'POST',
    headers: { Accept: 'application/json' },
  };

  axios(options)
    .then((response) => {
      const authorizedApp = {
        userId: req.userId,
        appName,
        credentials: [{
          attributeName: 'access_token',
          attributeValue: response.data.access_token,
        }, {
          attributeName: 'token_type',
          attributeValue: response.data.token_type,
        }],
      };
      AuthorizedApps.create(authorizedApp);

      res.render('authSuccess');
    })
    .catch(() => {
      res.render('authError');
    });
};

const authController = {
  renderAuthRequestPage,
  slackAuthGrant,
  githubAuthGrant,
};

export default authController;
