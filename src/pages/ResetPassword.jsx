import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { isStrongPassword, getPasswordStrengthError } from '../utils/validation';
import { resetPassword } from '../api/auth';
import { showSuccessToast } from '../utils/showToast';

import PasswordInput from '../components/form/PasswordInput';
import ErrorMessage from '../components/form/ErrorMessage';
import SubmitButton from '../components/form/SubmitButton';
import useMediaQuery from '../hooks/useMediaQuery';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const isMdUp = useMediaQuery('(min-width: 768px)');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const { password, confirmPassword } = formData;
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  const isFormIncomplete = !password || !confirmPassword;

  const handleChange = e => {
    const { name, value } = e.target;

    // Update formData dynamically
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }

    // Real-time password validation
    if (name === 'password') {
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

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
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
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await resetPassword(userId, token, password);

      if (result.success) {
        // Reset form state
        setFormData({
          password: '',
          confirmPassword: '',
        });
        setErrors({});
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
      setIsSubmitting(false);
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
              name="password"
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
