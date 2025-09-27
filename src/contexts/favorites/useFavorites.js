import { useContext } from 'react';
import { FavoritesContextState, FavoritesContextDispatch } from './favoritesContext';
import {
  getFavoriteItems,
  isFavorite,
  getFavoriteById,
  getFavoritesLoading,
  getFavoritesError,
} from './favoritesSelectors';

export const useFavoritesState = () => {
  const state = useContext(FavoritesContextState);
  if (!state) {
    throw new Error('useFavoritesState must be used within a FavoritesProvider');
  }
  return state;
};

export const useFavoritesDispatch = () => {
  const dispatch = useContext(FavoritesContextDispatch);
  if (!dispatch) {
    throw new Error('useFavoritesDispatch must be used within a FavoritesProvider');
  }
  return dispatch;
};

// Combined hook for easier usage
export const useFavorites = () => {
  const state = useFavoritesState();
  const dispatch = useFavoritesDispatch();

  return {
    // State
    favoriteItems: getFavoriteItems(state),
    isLoading: getFavoritesLoading(state),
    error: getFavoritesError(state),

    // Selectors
    isFavorite: productId => isFavorite(state, productId),
    getFavoriteById: productId => getFavoriteById(state, productId),

    // Dispatch
    dispatch,
  };
};
