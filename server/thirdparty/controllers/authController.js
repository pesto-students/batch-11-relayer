import axios from 'axios';
import AuthorizedApps from '../../models/AuthorizedApps';
import constants from '../constants/thirdPartyConstants';
import tokenLib from '../../lib/authTokenLib';

const renderAuthRequestPage = async (req, res) => {
  const appName = req.params.appName.toUpperCase();
  let fetchedApp = await AuthorizedApps.findOne({ isPublished: true, userId: req.query.userId, appName });
  if (!fetchedApp) {
    fetchedApp = await AuthorizedApps.create({ userId: req.query.userId, appName });
  }
  switch (appName) {
    case 'GITHUB': {
      const identificationToken = tokenLib.createGenericAuthToken({ authAppId: fetchedApp.authAppId });
      res.redirect(`https://github.com/apps/relayer-test/installations/new?state=${identificationToken}`);
      break;
    }
    default: {
      const { userId } = req;
      const authorizationRequestURL = `${constants[`${appName}_URL`]}&${constants[`${appName}_CLIENT_ID`]}&${constants[`${appName}_SCOPE`]}&${constants[`${appName}_REDIRECT_URL`]}&state=${userId}`;
      res.render('OAuthWindow', {
        authorizationRequestURL,
      });
    }
  }
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
    url: 'https://github.com/apps/relayer-test/installations/new',
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
