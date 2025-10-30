import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthState } from '../../contexts/auth/useAuth';

const AdminBoundary = ({ children }) => {
  const { isAuthenticated, isAuthLoading, currentUser } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    const role = currentUser?.role;
    if (role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, currentUser, navigate]);

  if (isAuthLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }
  if (currentUser?.role !== 'admin') {
    return (
      <div className="py-10">
        <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-md text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-sm text-gray-600 mb-4">You don't have permission to view this area.</p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="px-4 py-2 text-sm font-medium text-white bg-msq-purple-rich rounded-md hover:bg-msq-purple-deep"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminBoundary;
