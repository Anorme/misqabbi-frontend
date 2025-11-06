import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchAuthenticatedUser } from '../../api/auth';
import { useAuthDispatch } from '../../contexts/auth/useAuth';
import { setCurrentUser, setAuthRestored } from '../../contexts/auth/authActions';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner.jsx';

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const maxRetries = 3;
  const retryDelay = 500; // 500ms delay for Safari cookie availability

  useEffect(() => {
    const hydrateUser = async (attempt = 0) => {
      try {
        // Small initial delay to allow cookies to be set (especially for Safari)
        // Safari may need a moment after redirect to make cookies available
        if (attempt === 0) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        const user = await fetchAuthenticatedUser();

        if (user) {
          // Successfully got user - set auth state
          dispatch(setCurrentUser(user));
          dispatch(setAuthRestored());

          // Small delay to ensure state propagation, especially for Safari
          setTimeout(() => {
            navigate('/shop', { replace: true });
          }, 100);
        } else {
          // No user found - retry if we haven't exceeded max retries
          // This handles Safari's delayed cookie availability
          if (attempt < maxRetries) {
            setTimeout(
              () => {
                hydrateUser(attempt + 1);
              },
              retryDelay * (attempt + 1)
            ); // Exponential backoff
          } else {
            // Max retries exceeded - redirect to login
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);

        // Retry on error if we haven't exceeded max retries
        if (attempt < maxRetries) {
          setTimeout(
            () => {
              hydrateUser(attempt + 1);
            },
            retryDelay * (attempt + 1)
          );
        } else {
          navigate('/login', { replace: true });
        }
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
