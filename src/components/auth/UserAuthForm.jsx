import { useState, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdPerson, MdEmail } from 'react-icons/md';

import {
  isValidEmail,
  isValidFullName,
  isStrongPassword,
  getPasswordStrengthError,
} from '../../utils/validation';
import { signInWithGoogleRedirect } from '../../api/auth';
import detectWebView from '../../utils/detectWebView';

import { useAuthState, useAuthDispatch } from '../../contexts/auth/useAuth';
import { setAuthError } from '../../contexts/auth/authActions';

import InputField from '../form/InputField';
import PasswordInput from '../form/PasswordInput';
import ErrorMessage from '../form/ErrorMessage';
import SubmitButton from '../form/SubmitButton';
import Divider from '../form/Divider';
import SocialButton from '../form/SocialButton';
import WebViewWarningModal from './WebViewWarningModal';

const API_URL = import.meta.env.VITE_API_URL;

const UserAuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { fullName, email, password } = formData;
  const [errors, setErrors] = useState({});

  const { authError } = useAuthState();
  const authDispatch = useAuthDispatch();

  const [showWebViewModal, setShowWebViewModal] = useState(false);
  const emailInputRef = useRef(null);

  const isFormIncomplete = !email || !password || (mode === 'register' && !fullName);

  const submitLabel = mode === 'register' ? 'Create Account' : 'Login';

  const handleChange = e => {
    const { name, value } = e.target;

    // Map displayName (form field) to fullName (state)
    const fieldName = name === 'displayName' ? 'fullName' : name;

    // Update formData dynamically
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    }

    // Real-time password validation for register mode
    if (mode === 'register' && fieldName === 'password') {
      // Only show error if password has content and is not strong
      if (value && !isStrongPassword(value)) {
        setErrors(prev => ({ ...prev, password: getPasswordStrengthError(value) }));
      } else {
        // Clear password error if password becomes valid or is empty
        setErrors(prev => {
          const { password: _, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    authDispatch(setAuthError(null));

    const validationErrors = {};
    if (mode === 'register' && !isValidFullName(fullName)) {
      validationErrors.fullName = 'Full name must be more than 3 characters';
    }
    if (!isValidEmail(email)) validationErrors.email = 'Please enter a valid email';
    if (mode === 'register' && !isStrongPassword(password)) {
      validationErrors.password = getPasswordStrengthError(password);
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, let the form submit naturally
    // The form's action and method will handle the submission
    e.target.submit();
  };

  const handleGoogleSignIn = async () => {
    authDispatch(setAuthError(null));

    // Check if we're in a WebView environment
    if (detectWebView()) {
      setShowWebViewModal(true);
      return;
    }

    // Proceed with normal Google sign-in flow
    try {
      signInWithGoogleRedirect();
    } catch (err) {
      authDispatch(setAuthError(err.message));
    }
  };

  const handleFocusEmailInput = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const formAction = mode === 'register' ? `${API_URL}/auth/signup` : `${API_URL}/auth/login`;

  return (
    <form action={formAction} method="POST" onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <InputField
          label="Full Name"
          type="text"
          name="displayName"
          value={fullName}
          onChange={handleChange}
          placeholder="Enter your name"
          icon={<MdPerson size={20} />}
          error={errors.fullName}
          sanitizeType="name"
        />
      )}

      <InputField
        ref={emailInputRef}
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email address"
        icon={<MdEmail size={20} />}
        error={errors.email}
        sanitizeType="email"
      />

      <PasswordInput
        name="password"
        value={password}
        onChange={handleChange}
        error={errors.password}
        showStrength={mode === 'register'}
      />

      <SubmitButton label={submitLabel} disabled={isFormIncomplete} />

      {authError && <ErrorMessage error={authError} />}

      <Divider />

      <SocialButton
        icon={<FcGoogle size={20} />}
        text="Sign in with Google"
        onClick={handleGoogleSignIn}
      />

      {/* WebView Warning Modal */}
      <WebViewWarningModal
        isOpen={showWebViewModal}
        onClose={() => setShowWebViewModal(false)}
        onUseEmailLogin={handleFocusEmailInput}
      />
    </form>
  );
};

export default UserAuthForm;
