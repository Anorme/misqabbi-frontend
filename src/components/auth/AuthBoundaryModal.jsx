import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthState } from '../../contexts/auth/useAuth';

const AuthBoundaryModal = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated (after loading completes)
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/shop', { replace: true });
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  // Show nothing while loading or after triggering redirect
  if (isAuthLoading || !isAuthenticated) {
    return null;
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default AuthBoundaryModal;
