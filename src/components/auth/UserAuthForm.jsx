import { FcGoogle } from 'react-icons/fc';
import { MdPerson, MdEmail } from 'react-icons/md';

import { isValidEmail, isStrongPassword } from '../../utils/validation';
import {
  registerUserWithEmail,
  loginUserWithEmail,
  signInWithGoogleRedirect,
} from '../../api/auth';

import { useFormState, useFormDispatch } from '../../contexts/form/useForm';
import { useAuthState, useAuthDispatch } from '../../contexts/auth/useAuth';
import { setAuthError } from '../../contexts/auth/authActions';
import {
  updateField,
  setErrors,
  clearErrors,
  startSubmit,
  stopSubmit,
} from '../../contexts/form/formActions';

import InputField from '../form/InputField';
import PasswordInput from '../form/PasswordInput';
import ErrorMessage from '../form/ErrorMessage';
import SubmitButton from '../form/SubmitButton';
import Divider from '../form/Divider';
import SocialButton from '../form/SocialButton';

const UserAuthForm = ({ mode }) => {
  const { values, errors, isSubmitting } = useFormState();
  const formDispatch = useFormDispatch();
  const { fullName = '', email = '', password = '' } = values;

  const { authError } = useAuthState();
  const authDispatch = useAuthDispatch();

  const isFormIncomplete = !email || !password || (mode === 'register' && !fullName);

  const submitLabel = isSubmitting
    ? mode === 'register'
      ? 'Registering...'
      : 'Logging in...'
    : mode === 'register'
      ? 'Create Account'
      : 'Login';

  const handleChange = e => {
    const { name, value } = e.target;
    formDispatch(updateField(name, value));
  };

  const handleRegister = async e => {
    e.preventDefault();
    formDispatch(clearErrors());
    formDispatch(startSubmit());
    authDispatch(setAuthError(null));

    const validationErrors = {};
    if (!isValidEmail(email)) validationErrors.email = 'Please enter a valid email';
    if (!isStrongPassword(password)) validationErrors.password = 'Please use a stronger password';

    if (Object.keys(validationErrors).length > 0) {
      formDispatch(setErrors(validationErrors));
      formDispatch(stopSubmit());
      return;
    }

    try {
      await registerUserWithEmail(email, password, fullName);
      // Backend will redirect to /auth/callback
    } catch (err) {
      authDispatch(setAuthError(err.message));
      formDispatch(stopSubmit());
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    formDispatch(clearErrors());
    formDispatch(startSubmit());
    authDispatch(setAuthError(null));

    try {
      await loginUserWithEmail(email, password);
      // Backend will redirect to /auth/callback
    } catch (err) {
      authDispatch(setAuthError(err.message));
      formDispatch(stopSubmit());
    }
  };

  const handleGoogleSignIn = async () => {
    authDispatch(setAuthError(null));
    try {
      signInWithGoogleRedirect();
    } catch (err) {
      authDispatch(setAuthError(err.message));
    }
  };

  return (
    <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-4">
      {mode === 'register' && (
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder="Enter your name"
          icon={<MdPerson size={20} />}
          error={errors.fullName}
        />
      )}

      <InputField
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
        value={password}
        onChange={handleChange}
        error={errors.password}
        showStrength={mode === 'register'}
      />

      <SubmitButton label={submitLabel} disabled={isFormIncomplete || isSubmitting} />

      {authError && <ErrorMessage error={authError} />}

      <Divider />

      <SocialButton
        icon={<FcGoogle size={20} />}
        text="Sign in with Google"
        onClick={handleGoogleSignIn}
      />
    </form>
  );
};

export default UserAuthForm;
