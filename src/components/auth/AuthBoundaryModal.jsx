import { useState, useEffect } from 'react';
import { useAuthState } from '../../contexts/auth/useAuth';
import AuthPromptModal from './AuthPromptModal';

const AuthBoundaryModal = ({ children }) => {
  const { isAuthenticated, isAuthLoading, hasRestoredAuth } = useAuthState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Don't run modal logic while loading
    if (isAuthLoading) return;

    // Show modal if user is not authenticated
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isAuthenticated, isAuthLoading, hasRestoredAuth]);

  // Don't render children until auth restoration is complete, but always render modal if needed
  if (!hasRestoredAuth || isAuthLoading) {
    return showModal ? <AuthPromptModal onClose={() => setShowModal(false)} /> : null;
  }

  return (
    <>
      {isAuthenticated ? children : null}
      {showModal && <AuthPromptModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AuthBoundaryModal;
