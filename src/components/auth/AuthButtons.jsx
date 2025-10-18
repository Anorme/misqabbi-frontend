import { Link } from 'react-router';
import { useAuthState } from '../../contexts/auth/useAuth.js';
import LoginButton from '../auth/LoginButton.jsx';
import LogoutButton from '../auth/LogoutButton.jsx';

const AuthButtons = ({ variant = 'desktop', className = '' }) => {
  const { isAuthenticated } = useAuthState();

  if (variant === 'mobile') {
    // Mobile variant - could be simplified or hidden
    return (
      <div className={`flex items-center ${className}`}>
        {/* Mobile auth buttons - can be customized as needed */}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`flex items-center ${className}`}>
      <div className="hidden lg:block p-2 mr-1">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
      {!isAuthenticated && (
        <Link to="/register" className="hidden lg:block">
          <button className="bg-msq-purple-rich text-white px-4 py-2 rounded-md hover:bg-msq-purple font-medium cursor-pointer">
            Create Account
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
