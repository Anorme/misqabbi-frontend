import { FAVORITES_ACTION_TYPES } from './favoritesActionTypes';
import { createAction } from '../../utils/createAction';

export const addFavorite = product => createAction(FAVORITES_ACTION_TYPES.ADD_FAVORITE, product);

export const removeFavorite = productId =>
  createAction(FAVORITES_ACTION_TYPES.REMOVE_FAVORITE, productId);

export const toggleFavorite = product =>
  createAction(FAVORITES_ACTION_TYPES.TOGGLE_FAVORITE, product);

export const clearFavorites = () => createAction(FAVORITES_ACTION_TYPES.CLEAR_FAVORITES, null);

export const setFavorites = favorites =>
  createAction(FAVORITES_ACTION_TYPES.SET_FAVORITES, favorites);

export const setLoading = isLoading => createAction(FAVORITES_ACTION_TYPES.SET_LOADING, isLoading);

export const setError = error => createAction(FAVORITES_ACTION_TYPES.SET_ERROR, error);
