import { useState, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdPerson, MdEmail } from 'react-icons/md';

import { isValidEmail, isStrongPassword } from '../../utils/validation';
import { signInWithGoogleRedirect } from '../../api/auth';
import detectWebView from '../../utils/detectWebView';

import { useFormState, useFormDispatch } from '../../contexts/form/useForm';
import { useAuthState, useAuthDispatch } from '../../contexts/auth/useAuth';
import { setAuthError } from '../../contexts/auth/authActions';
import { updateField, setErrors, clearErrors } from '../../contexts/form/formActions';

import InputField from '../form/InputField';
import PasswordInput from '../form/PasswordInput';
import ErrorMessage from '../form/ErrorMessage';
import SubmitButton from '../form/SubmitButton';
import Divider from '../form/Divider';
import SocialButton from '../form/SocialButton';
import WebViewWarningModal from './WebViewWarningModal';

const API_URL = import.meta.env.VITE_API_URL;

const UserAuthForm = ({ mode }) => {
  const { values, errors } = useFormState();
  const formDispatch = useFormDispatch();
  const { fullName = '', email = '', password = '' } = values;

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
    formDispatch(updateField(fieldName, value));
  };

  const handleSubmit = e => {
    e.preventDefault();
    formDispatch(clearErrors());
    authDispatch(setAuthError(null));

    const validationErrors = {};
    if (!isValidEmail(email)) validationErrors.email = 'Please enter a valid email';
    if (mode === 'register' && !isStrongPassword(password)) {
      validationErrors.password = 'Please use a stronger password';
    }

    if (Object.keys(validationErrors).length > 0) {
      formDispatch(setErrors(validationErrors));
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
