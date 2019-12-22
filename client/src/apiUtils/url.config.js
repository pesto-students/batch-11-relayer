// export const BASE_URL = 'https://relayer-api.herokuapp.com/';
export const BASE_URL = 'https://d446c646.ngrok.io/';

/*
  Follow below pattern with constants naming:
  HTTP METHOD_ACTION PERFORMED
*/

// constants for apps
export const GET_ALL_APPS = 'api/v1/apps';
export const GET_AUTH_APP = 'api/v1/authorize/';

// constants for relays
export const POST_CREATE_RELAY = 'api/v1/relays';
export const GET_ALL_RELAYS = 'api/v1/relays';
export const PUT_EDIT_RELAY = 'api/v1/relays/';
export const GET_TASK_HISTORY = 'api/v1/relay/log';

// constants for app details
export const POST_APP_DETAILS = 'api/v1/details';

// constants for users
export const POST_USER_SIGN_UP = 'user/signup';
export const POST_USER_SIGN_IN = 'user/signin';
