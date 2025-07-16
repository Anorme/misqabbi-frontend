import { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { getPasswordStrength } from '../../utils/strength';
import { isValidEmail, isStrongPassword } from '../../utils/validation';
import { registerUserWithEmail, signInWithGooglePopup } from '../../utils/firebase';

import { useAuthState, useAuthDispatch } from '../../contexts/auth/useAuth';
import { setAuthLoading, setCurrentUser, setAuthError } from '../../contexts/auth/authActions';
import { useFormState, useFormDispatch } from '../../contexts/form/useForm';
import {
  updateField,
  setErrors,
  clearErrors,
  startSubmit,
  stopSubmit,
  resetForm,
} from '../../contexts/form/formActions';

import { EmailSignInModal } from './EmailSignInModal';

const UserAuthForm = () => {
  const { values, errors, isSubmitting } = useFormState();
  const formDispatch = useFormDispatch();
  const { fullName = '', email = '', password = '' } = values;
  const passwordStrength = getPasswordStrength(password);

  const [showPassword, setShowPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { isAuthLoading, authError, currentUser } = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    formDispatch(updateField(name, value));
  };

  const handleRegister = async e => {
    e.preventDefault();

    formDispatch(clearErrors());
    formDispatch(startSubmit());
    authDispatch(setAuthError(null));
    authDispatch(setAuthLoading(true));

    const validationErrors = {};
    if (!isValidEmail(email)) validationErrors.email = 'Please enter a valid email';
    if (!isStrongPassword(password)) validationErrors.password = 'Please use a stronger password';

    if (Object.keys(validationErrors).length > 0) {
      formDispatch(setErrors(validationErrors));
      formDispatch(stopSubmit());
      authDispatch(setAuthLoading(false));
      return;
    }

    try {
      const userCred = await registerUserWithEmail(email, password, { fullName });
      authDispatch(setCurrentUser(userCred.user));
      formDispatch(resetForm());
    } catch (err) {
      authDispatch(setAuthError(err.message));
    } finally {
      formDispatch(stopSubmit());
      authDispatch(setAuthLoading(false));
    }
  };

  const handleGoogleSignIn = async () => {
    authDispatch(setAuthError(null));
    authDispatch(setAuthLoading(true));

    try {
      const userCred = await signInWithGooglePopup();
      authDispatch(setCurrentUser(userCred.user));
    } catch (err) {
      authDispatch(setAuthError(err.message));
    } finally {
      authDispatch(setAuthLoading(false));
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          value={fullName}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300"
          style={{ borderRadius: '15px' }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MdPerson size={20} />
        </span>
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300"
          style={{ borderRadius: '15px' }}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MdEmail size={20} />
        </span>
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={mode === 'register' ? 'Enter a password' : 'enter your password'}
          value={password}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300 font-medium placeholder:font-medium"
          style={{ borderRadius: '15px' }}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </button>
        {mode === 'register' && passwordStrength && (
          <p
            className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Weak' ? 'text-yellow-600' : 'text-red-600'}`}
          >
            Password strength: {passwordStrength}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-[60%] mx-auto bg-purple-700 text-white py-3 font-semibold"
        style={{ borderRadius: '15px' }}
        disabled={isAuthLoading || isSubmitting}
      >
        {isAuthLoading ? 'Registering...' : 'Create Account'}
      </button>
      {authError && <p className="text-red-500 text-sm">{authError}</p>}
      {currentUser && <p className="text-green-500 text-sm">Welcome {currentUser.displayName}</p>}
      <div className="flex items-center my-4 w-[60%] mx-auto">
        <hr className="flex-grow border-t-2 border-gray-400" />
        <span className="mx-4 text-gray-700 font-bold">or</span>
        <hr className="flex-grow border-t-2 border-gray-400" />
      </div>

      <button
        className="w-[60%] mx-auto py-3 rounded-md mb-2 flex justify-center items-center gap-2 cursor-pointer"
        type="button"
        onClick={() => setShowEmailModal(true)}
      >
        <MdEmail size={22} />
        Continue with email
      </button>
      <button
        className="w-[60%] mx-auto py-3 rounded-md flex justify-center items-center gap-2 cursor-pointer"
        type="button"
        onClick={handleGoogle}
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
      {showEmailModal && <EmailSignInModal onClose={() => setShowEmailModal(false)} />}
    </form>
  );
};

export default UserAuthForm;
