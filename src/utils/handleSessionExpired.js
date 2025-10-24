import { toast } from 'react-toastify';
import { logoutUser } from '../contexts/auth/authActions';

export const createSessionExpiredHandler = (authDispatch, navigate) => {
  return () => {
    // Clear auth state
    authDispatch(logoutUser());

    // Show user-friendly message
    toast.error('Session expired. Please log in again.');

    // Redirect to login
    navigate('/login');
  };
};
