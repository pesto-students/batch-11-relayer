import * as ActionTypes from './ActionTypes';
import callAPI from '../utils/apiCaller';

export const requestLogin = () => ({ type: ActionTypes.LOGIN_REQUEST });
export const receiveLogin = (user) => ({ type: ActionTypes.LOGIN_SUCCESS, user });
export const loginError = (msg) => ({ type: ActionTypes.LOGIN_FAILURE, msg });

export const loginUser = (url, creds) => async (dispatch) => {
  dispatch(requestLogin(creds));
  await callAPI(url, 'POST', creds)
    .then((res) => {
      if (res.error) {
        dispatch(loginError(res.message));
      } else {
        dispatch(receiveLogin(creds));
      }
    })
    .catch(err => dispatch(loginError(err.message)));
};

export const requestSignup = () => ({ type: ActionTypes.SIGNUP_REQUEST });
export const receiveSignup = (user) => ({ type: ActionTypes.SIGNUP_SUCCESS, user });
export const signupError = (msg) => ({ type: ActionTypes.SIGNUP_FAILURE, msg });

export const signupUser = (url, creds) => async (dispatch) => {
  dispatch(requestSignup(creds));
  await callAPI(url, 'POST', creds)
    .then((res) => {
      if (res.error) {
        dispatch(signupError(res.message));
      } else {
        dispatch(receiveSignup(creds));
      }
    })
    .catch(err => signupError(err.message));
};

export const requestLogout = () => ({ type: ActionTypes.LOGOUT_REQUEST });
export const receiveLogout = () => ({ type: ActionTypes.LOGOUT_SUCCESS });
export const logoutError = (msg) => ({ type: ActionTypes.LOGOUT_FAILURE, msg });

export const logoutUser = (url) => async (dispatch) => {
  dispatch(requestLogout());
  await callAPI(url, 'POST')
    .then((res) => {
      if (res.error) {
        dispatch(logoutError(res.message));
      } else {
        dispatch(receiveLogout());
      }
    })
    .catch(err => logoutError(err.message));
};
