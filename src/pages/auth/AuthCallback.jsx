import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchAuthenticatedUser } from '../../api/auth';
import { useAuthDispatch } from '../../contexts/auth/useAuth';
import { setCurrentUser } from '../../contexts/auth/authActions';

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
  }, []);

  return <p>Authenticating...</p>;
};

export default AuthCallback;
