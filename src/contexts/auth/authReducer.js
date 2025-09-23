import { AUTH_ACTION_TYPES } from './authActionTypes';

import { isValidUser } from './utils';

export const initialAuthState = {
  currentUser: null,
  isAuthenticated: false,
  isAuthLoading: false,
  hasRestoredAuth: false,
  authError: null,
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: isValidUser(payload),
        authError: null,
      };

    case AUTH_ACTION_TYPES.SET_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: payload,
      };

    case AUTH_ACTION_TYPES.SET_AUTH_RESTORED:
      return {
        ...state,
        hasRestoredAuth: true,
      };

    case AUTH_ACTION_TYPES.SET_AUTH_ERROR:
      return {
        ...state,
        authError: payload,
        isAuthLoading: false,
      };

    case AUTH_ACTION_TYPES.LOGOUT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: false,
        isAuthLoading: false,
        hasRestoredAuth: false,
        authError: null,
      };

    default:
      console.warn(`Unhandled auth action type: ${type}`);
      return state;
  }
};
