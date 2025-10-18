import { useState, useEffect } from 'react';
import { useAuthState } from '../../contexts/auth/useAuth';
import AuthPromptModal from './AuthPromptModal';
import { useDebounce } from '../../utils/debounce';

const AuthBoundaryModal = ({ children }) => {
  const { isAuthenticated, isAuthLoading, hasRestoredAuth } = useAuthState();
  const [showModal, setShowModal] = useState(false);

  // Debounce the modal display to prevent flashing during auth loading
  const debouncedShowModal = useDebounce(showModal, 600);

  useEffect(() => {
    // Only set modal state after auth restoration is complete
    if (hasRestoredAuth && !isAuthLoading) {
      if (!isAuthenticated) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [isAuthenticated, isAuthLoading, hasRestoredAuth]);

  // Don't render children until auth restoration is complete, but always render modal if needed
  if (!hasRestoredAuth || isAuthLoading) {
    return debouncedShowModal ? <AuthPromptModal onClose={() => setShowModal(false)} /> : null;
  }

  return (
    <>
      {isAuthenticated ? children : null}
      {debouncedShowModal && <AuthPromptModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AuthBoundaryModal;
