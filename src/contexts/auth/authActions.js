import { createAction } from '../../utils/createAction';
import { AUTH_ACTION_TYPES } from './authActionTypes';

export const setCurrentUser = user => createAction(AUTH_ACTION_TYPES.SET_CURRENT_USER, user);

export const setAuthLoading = isLoading =>
  createAction(AUTH_ACTION_TYPES.SET_AUTH_LOADING, isLoading);

export const setAuthRestored = () => createAction(AUTH_ACTION_TYPES.SET_AUTH_RESTORED);

export const setAuthError = errorMessage =>
  createAction(AUTH_ACTION_TYPES.SET_AUTH_ERROR, errorMessage);

export const logoutUser = () => createAction(AUTH_ACTION_TYPES.LOGOUT_USER, null);
