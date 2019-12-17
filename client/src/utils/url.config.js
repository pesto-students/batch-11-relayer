// export const BASE_URL = 'https://d446c646.ngrok.io/';
export const BASE_URL = 'https://relayer-api.herokuapp.com/';
// export const BASE_URL = 'http://localhost:3001/';

/*
  Follow below pattern with constants naming:
  HTTP METHOD_ACTION PERFORMED
*/

// constants for apps
export const GET_ALL_APPS = 'api/v1/apps';
export const GET_ADD_APP_ACCOUNT = 'authorize';

// constants for relays
export const POST_CREATE_RELAY = 'api/v1/relays';
export const GET_ALL_RELAYS = 'api/v1/relays';
export const PUT_EDIT_RELAY = 'api/v1/relays';
export const GET_RELAY = 'api/v1/relay';

// constants for users
export const POST_USER_SIGN_UP = 'user/signup';
export const POST_USER_SIGN_IN = 'user/signin';
