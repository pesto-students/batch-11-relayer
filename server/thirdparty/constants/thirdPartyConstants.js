exports.SLACK_URL = 'https://slack.com/oauth/authorize?&scope=identity.basic';
exports.SLACK_CLIENT_ID = 'client_id=47380506901.859398657013';
exports.SLACK_SCOPE = 'scope=bot chat:write:bot channels:read channels:history groups:history im:history';
exports.SLACK_REDIRECT_URL = 'redirect_uri= https://e32d3e48.ngrok.io/auth/slack/callback';
exports.SLACK_AUTH_GRANT_URL = 'https://slack.com/api/oauth.access?';
exports.SLACK_CLIENT_SECRET = 'client_secret=e1cc055910599f749f3d5a9d6fc74a94'; // Move this to some other place

exports.GITHUB_URL = 'https://github.com/login/oauth/authorize?';
exports.GITHUB_CLIENT_ID = 'client_id=74aaa4232cd0b2400acd';
exports.GITHUB_SCOPE = 'scope=repo user notifications';
exports.GITHUB_REDIRECT_URL = 'redirect_uri=https://e32d3e48.ngrok.io/auth/github/callback';
exports.GITHUB_AUTH_GRANT_URL = 'https://github.com/login/oauth/access_token?';
exports.GITHUB_CLIENT_SECRET = 'client_secret=ae76db074bbb5a3358c02c8ee7f508b8f0355422'; // Move this to some other place
