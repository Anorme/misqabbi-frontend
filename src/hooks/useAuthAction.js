import { useState } from 'react';
import { useAuthState } from '../contexts/auth/useAuth';

const useAuthAction = () => {
  const { isAuthenticated } = useAuthState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('general');

  const requireAuth = (action, context = 'general', showModalDelay = 0) => {
    if (isAuthenticated) {
      action();
      return true; // User is authenticated, proceed with action
    } else {
      // User is not authenticated, show modal
      setModalContext(context);

      if (showModalDelay > 0) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, showModalDelay);
      } else {
        setIsModalOpen(true);
      }

      return false; // Action should not proceed
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    requireAuth,
    closeModal,
    isModalOpen,
    modalContext,
  };
};

export default useAuthAction;
