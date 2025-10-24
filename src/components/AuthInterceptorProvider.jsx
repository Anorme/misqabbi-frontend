import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthDispatch } from '../contexts/auth/useAuth';
import { setupAxiosInterceptor } from '../api/axios-interceptor';
import { createSessionExpiredHandler } from '../utils/handleSessionExpired';

const AuthInterceptorProvider = ({ children }) => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionExpired = createSessionExpiredHandler(authDispatch, navigate);
    setupAxiosInterceptor(handleSessionExpired);
  }, [authDispatch, navigate]);

  return children;
};

export default AuthInterceptorProvider;
