import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errMess: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_REQUEST:
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: false };

    case ActionTypes.SIGNUP_SUCCESS:
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, isAuthenticated: true, user: action.user,
      };

    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state, isLoading: false, isAuthenticated: false, errMess: action.message,
      };

    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: true };

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state, isLoading: false, isAuthenticated: false, user: null,
      };

    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state, isLoading: false, isAuthenticated: true, errMess: action.message,
      };

    default:
      return state;
  }
};
