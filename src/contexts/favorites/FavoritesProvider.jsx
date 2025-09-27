import { useReducer, useEffect } from 'react';
import { favoritesReducer, initialFavoritesState } from './favoritesReducer';
import { FavoritesContextState, FavoritesContextDispatch } from './favoritesContext';
import { fetchFavorites } from '../../api/favorites';
import { useAuthState } from '../auth/useAuth';
import { setFavorites, setLoading, setError } from './favoritesActions';

const getHydratedState = () => {
  // In the future, we can add localStorage persistence like the cart
  return initialFavoritesState;
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, getHydratedState());
  const { isAuthenticated, isAuthLoading } = useAuthState();

  // Load favorites when user becomes authenticated
  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated || isAuthLoading) return;

      try {
        dispatch(setLoading(true));
        const favorites = await fetchFavorites();
        dispatch(setFavorites(favorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        dispatch(setError(error.message || 'Failed to load favorites'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadFavorites();
  }, [isAuthenticated, isAuthLoading]);

  // Clear favorites when user logs out
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      dispatch(setFavorites([]));
    }
  }, [isAuthenticated, isAuthLoading]);

  return (
    <FavoritesContextState.Provider value={state}>
      <FavoritesContextDispatch.Provider value={dispatch}>
        {children}
      </FavoritesContextDispatch.Provider>
    </FavoritesContextState.Provider>
  );
};
