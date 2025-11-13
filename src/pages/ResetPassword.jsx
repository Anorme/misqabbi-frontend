import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { isStrongPassword, getPasswordStrengthError } from '../utils/validation';
import { resetPassword } from '../api/auth';
import { useFormState, useFormDispatch } from '../contexts/form/useForm';
import { showSuccessToast } from '../utils/showToast';
import {
  updateField,
  setErrors,
  clearErrors,
  startSubmit,
  stopSubmit,
  resetForm,
} from '../contexts/form/formActions';

import PasswordInput from '../components/form/PasswordInput';
import ErrorMessage from '../components/form/ErrorMessage';
import SubmitButton from '../components/form/SubmitButton';
import useMediaQuery from '../hooks/useMediaQuery';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const isMdUp = useMediaQuery('(min-width: 768px)');

  const { values, errors, isSubmitting } = useFormState();
  const formDispatch = useFormDispatch();

  const { password = '', confirmPassword = '' } = values;
  const [authError, setAuthError] = useState(null);

  const isFormIncomplete = !password || !confirmPassword;

  const handleChange = e => {
    const { name, value } = e.target;
    formDispatch(updateField(name, value));

    // Real-time password validation
    if (name === 'password') {
      // Only show error if password has content and is not strong
      if (value && !isStrongPassword(value)) {
        formDispatch(setErrors({ ...errors, password: getPasswordStrengthError(value) }));
      } else if (value && isStrongPassword(value)) {
        // Clear password error if password becomes valid
        const { password: _, ...restErrors } = errors;
        formDispatch(setErrors(restErrors));
      } else {
        // Clear error if field is empty
        const { password: _, ...restErrors } = errors;
        formDispatch(setErrors(restErrors));
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    formDispatch(clearErrors());
    formDispatch(startSubmit());
    setAuthError(null);

    const validationErrors = {};

    // Validate password strength
    if (!isStrongPassword(password)) {
      validationErrors.password = getPasswordStrengthError(password);
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      formDispatch(setErrors(validationErrors));
      formDispatch(stopSubmit());
      return;
    }

    try {
      const result = await resetPassword(userId, token, password);

      if (result.success) {
        formDispatch(resetForm());
        showSuccessToast('Password reset successful! Redirecting to login...');

        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      console.error('Password reset error:', error);

      // Handle specific error cases
      if (error.message?.includes('invalid') || error.message?.includes('expired')) {
        setAuthError('This reset link is invalid or has expired. Please request a new one.');
      } else {
        setAuthError('Unable to reset password. Please try again.');
      }
    } finally {
      formDispatch(stopSubmit());
    }
  };

  return (
    <div className="min-h-screen w-screen flex md:items-center justify-center bg-white p-0 m-0 font-lato">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-5xl flex bg-white rounded-none md:rounded-2xl overflow-visible md:overflow-hidden md:shadow-lg mx-0 md:mx-4 my-0 md:my-16 min-h-screen md:min-h-0">
        {isMdUp && (
          <div className="w-[45%] hidden md:flex items-stretch">
            <img
              src="https://res.cloudinary.com/dyciw970t/image/upload/v1762028288/IMG_0017_copy_hpuavv.jpg"
              alt="Visual"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="font-bebas text-[22px] sm:text-[24px] font-bold uppercase text-msq-purple-rich text-center mb-[74px] sm:mb-6">
            Reset Your Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput
              value={password}
              onChange={handleChange}
              error={errors.password}
              showStrength={true}
              label="New Password"
            />

            <PasswordInput
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              showStrength={false}
              label="Confirm New Password"
              placeholder="Confirm your new password"
            />

            <SubmitButton
              label={isSubmitting ? 'Resetting...' : 'Reset Password'}
              disabled={isFormIncomplete || isSubmitting}
            />

            {authError && <ErrorMessage error={authError} />}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a href="/login" className="text-msq-purple-rich font-medium hover:underline">
                <span className="font-corsiva">Sign in</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
