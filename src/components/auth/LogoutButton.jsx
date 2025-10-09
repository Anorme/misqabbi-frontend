import { useAuthDispatch } from '../../contexts/auth/useAuth.js';
import { logoutUser } from '../../contexts/auth/authActions.js';
import { logoutUser as logoutUserApi } from '../../api/auth.js';

const LogoutButton = ({ className = '', onClick, ...props }) => {
  const authDispatch = useAuthDispatch();

  const handleLogout = async () => {
    try {
      const success = await logoutUserApi();
      if (success) {
        localStorage.removeItem('isAuthenticated');
        authDispatch(logoutUser());
        // Call additional onClick if provided
        if (onClick) {
          onClick();
        }
      } else {
        console.error('Logout API call failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-msq-purple-light hover:text-msq-purple-rich font-medium cursor-pointer ${className}`}
      {...props}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
