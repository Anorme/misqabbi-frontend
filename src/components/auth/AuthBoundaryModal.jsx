import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthState } from '../../contexts/auth/useAuth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const AuthBoundaryModal = ({ children }) => {
  const { isAuthenticated, isAuthLoading, hasRestoredAuth } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect only after auth restoration completes
    if (hasRestoredAuth && !isAuthLoading && !isAuthenticated) {
      navigate('/shop', { replace: true });
    }
  }, [hasRestoredAuth, isAuthLoading, isAuthenticated, navigate]);

  // Show spinner while loading/restoring
  if (isAuthLoading || !hasRestoredAuth) {
    return (
      <div className="py-10 flex items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }
  // After restoration, if not authenticated, boundary will have navigated
  if (!isAuthenticated) return null;

  // Only render children if authenticated
  return <>{children}</>;
};

export default AuthBoundaryModal;
