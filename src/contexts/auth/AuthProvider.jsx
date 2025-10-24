import { useReducer, useEffect } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthStateContext, AuthDispatchContext } from './authContext';
import { setCurrentUser, setAuthLoading, logoutUser, setAuthRestored } from './authActions';
import { fetchAuthenticatedUser } from '../../api/auth';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const restoreAuthState = async () => {
    dispatch(setAuthLoading(true));

    try {
      const user = await fetchAuthenticatedUser();
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logoutUser(null));
      }
    } catch {
      console.log('No existing session found');
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
