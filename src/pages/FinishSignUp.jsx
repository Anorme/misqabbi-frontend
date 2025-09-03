import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { completeSignInWithEmailLink } from '../utils/firebase';
import { createUserDocument } from '../utils/firebase';
import FullScreenLoader from '../components/ui/FullScreenLoader';

const FinishSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuthFlow = async () => {
      const user = await completeSignInWithEmailLink();

      if (user) {
        await createUserDocument(user);
        navigate('/shop');
      } else {
        navigate('/register');
      }
    };

    completeAuthFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FullScreenLoader message="Completing your sign-in..." />;
};

export default FinishSignUp;
