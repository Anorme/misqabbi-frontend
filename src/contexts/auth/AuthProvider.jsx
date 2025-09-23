import { useReducer, useEffect } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthStateContext, AuthDispatchContext } from './authContext';
import { setCurrentUser, setAuthLoading, logoutUser, setAuthRestored } from './authActions';
import { fetchAuthenticatedUser } from '../../api/auth';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const restoreAuthState = async () => {
    // Check localStorage first to avoid unnecessary API calls
    const isAuthenticatedInStorage = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticatedInStorage) {
      // No localStorage flag means user is definitely not authenticated
      dispatch(logoutUser(null));
      dispatch(setAuthRestored());
      return;
    }

    dispatch(setAuthLoading(true));

    try {
      const user = await fetchAuthenticatedUser();
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        // User was marked as authenticated in localStorage but server says no
        // Clean up localStorage to match server state
        localStorage.removeItem('isAuthenticated');
        dispatch(logoutUser(null));
      }
    } catch {
      console.log('No existing session found');
      // Clean up localStorage if server call fails
      localStorage.removeItem('isAuthenticated');
      dispatch(logoutUser(null));
    } finally {
      dispatch(setAuthLoading(false));
      dispatch(setAuthRestored());
    }
  };

  // Restore auth state on app initialization
  useEffect(() => {
    restoreAuthState();
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
