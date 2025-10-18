import { useState } from 'react';
import { X } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { isValidEmail } from '../../utils/validation';
import { requestPasswordReset } from '../../api/auth';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import InputField from '../form/InputField';
import SubmitButton from '../form/SubmitButton';

const PasswordResetModal = ({ isOpen, onClose, userEmail }) => {
  const [email, setEmail] = useState(userEmail || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      showErrorToast('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      localStorage.setItem('passwordResetEmail', email);
      showSuccessToast('Check your inbox! A reset link is on its way');
      onClose();
    } catch (error) {
      console.error('Password reset error:', error);
      showErrorToast('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-bebas text-[24px] font-bold uppercase text-msq-purple-rich mb-2">
            Reset Your Password
          </h2>
          <p className="text-gray-600 text-sm font-lato">Let's help you reset your password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            icon={<MdEmail size={20} />}
          />

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">We'll send a secure link to your email</p>
            <SubmitButton
              label={isLoading ? 'Sending...' : 'Send Reset Link'}
              disabled={!email || isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetModal;
