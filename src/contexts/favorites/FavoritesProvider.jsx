import { useReducer, useEffect } from 'react';
import { favoritesReducer, initialFavoritesState } from './favoritesReducer';
import { FavoritesContextState, FavoritesContextDispatch } from './favoritesContext';
import { useAuthState } from '../auth/useAuth';
import { setFavorites, setLoading, setError } from './favoritesActions';
import { useFavorites as useFavoritesQuery } from '../../hooks/queries/useFavorites';

const getHydratedState = () => {
  // In the future, we can add localStorage persistence like the cart
  return initialFavoritesState;
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, getHydratedState());
  const { isAuthenticated, isAuthLoading } = useAuthState();

  // Use TanStack Query for favorites fetching with caching
  const {
    data: favorites,
    isLoading: queryLoading,
    isError: queryError,
    error: queryErrorObj,
  } = useFavoritesQuery({
    enabled: isAuthenticated && !isAuthLoading, // Only fetch if authenticated
  });

  // Sync query data and loading state to context
  useEffect(() => {
    if (!isAuthenticated || isAuthLoading) {
      if (!isAuthenticated && !isAuthLoading) {
        // Clear favorites when user logs out
        dispatch(setFavorites([]));
      }
      return;
    }

    if (queryLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (queryError) {
      dispatch(setError(queryErrorObj?.message || 'Failed to load favorites'));
    } else if (favorites) {
      dispatch(setFavorites(favorites));
      dispatch(setError(null));
    }
  }, [isAuthenticated, isAuthLoading, favorites, queryLoading, queryError, queryErrorObj]);

  return (
    <FavoritesContextState.Provider value={state}>
      <FavoritesContextDispatch.Provider value={dispatch}>
        {children}
      </FavoritesContextDispatch.Provider>
    </FavoritesContextState.Provider>
  );
};
