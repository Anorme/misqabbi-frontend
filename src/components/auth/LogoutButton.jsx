import { useAuthDispatch } from '../../contexts/auth/useAuth.js';
import { logoutUser } from '../../contexts/auth/authActions.js';
import { logoutUser as logoutUserApi } from '../../api/auth.js';

const LogoutButton = () => {
  const authDispatch = useAuthDispatch();

  const handleLogout = async () => {
    try {
      const success = await logoutUserApi();
      if (success) {
        localStorage.removeItem('isAuthenticated');
        authDispatch(logoutUser());
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
      className="text-[#d265ff] hover:text-msq-purple-rich font-medium cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
