import request from 'request';
import eventEmitter from './eventsLib';
import AuthorizedApps from '../models/AuthorizedApps';

eventEmitter.on('Github:Authorize', async (payload) => {
  // eslint-disable-next-line camelcase
  const { state, installation_id, code } = payload;
  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: { Accept: 'application/json' },
    json: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
  };
  request(options, async (err, response, body) => {
    const authorizedApp = await AuthorizedApps.findOne({ authAppId: state.authAppId });
    const credentials = [{
      attributeName: 'access_token',
      attributeValue: body.access_token,
    }, {
      attributeName: 'token_type',
      attributeValue: body.token_type,
    }, {
      attributeName: 'installation_id',
      attributeValue: installation_id,
    }];
    authorizedApp.credentials = credentials;
    await authorizedApp.save();
  });
});
