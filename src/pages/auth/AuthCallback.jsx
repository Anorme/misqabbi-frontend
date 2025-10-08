import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchAuthenticatedUser } from '../../api/auth';
import { useAuthDispatch } from '../../contexts/auth/useAuth';
import { setCurrentUser } from '../../contexts/auth/authActions';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner.jsx';

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const hydrateUser = async () => {
      const user = await fetchAuthenticatedUser();
      if (user) {
        dispatch(setCurrentUser(user));
        navigate('/shop');
      } else {
        navigate('/login');
      }
    };

    hydrateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size={80} color="#cfb484" />
      </div>
    </div>
  );
};

export default AuthCallback;
