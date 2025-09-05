import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import FullScreenLoader from '../components/UI/FullScreenLoader';

const FinishSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuthFlow = async () => {
      try {
        // Example: read token or email confirmation params from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          navigate('/register');
          return;
        }

        // Call backend API to confirm sign-in / finish sign-up
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          navigate('/register');
          return;
        }

        const data = await response.json();

        // Save user + token in localStorage or context
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate to shop after successful sign-in
        navigate('/shop');
      } catch (error) {
        console.error('Error completing sign-in:', error);
        navigate('/register');
      }
    };

    completeAuthFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FullScreenLoader message="Completing your sign-in..." />;
};

export default FinishSignUp;
