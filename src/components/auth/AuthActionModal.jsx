import { useNavigate, useLocation } from 'react-router';
import { X } from 'lucide-react';

const AuthActionModal = ({
  isOpen,
  onClose,
  context = 'general',
  action = 'access this feature',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Context-specific copy based on the action being performed
  const getContextualCopy = () => {
    switch (context) {
      case 'favorites':
        return {
          heading: 'Hey beauty, ready to save your faves? 💖',
          message:
            "To keep your wishlist safe and stylish, you'll need to sign in first. That way, your picks stay with you anytime, anywhere.",
          primaryButton: 'Log In',
          secondaryButton: 'Create Account',
          tertiaryButton: 'Keep Browsing',
        };
      case 'checkout':
        return {
          heading: "Let's wrap this up beautifully 💫",
          message:
            "To complete your order and make it official, you'll need to sign in. It's quick, secure, and ensures your goodies get to you without a hitch.",
          primaryButton: 'Log In',
          secondaryButton: 'Create Account',
          tertiaryButton: 'Maybe Later',
        };
      case 'cart':
        return {
          heading: 'Ready to add this to your cart? 🛍️',
          message:
            "Sign in to add items to your cart and keep them safe until you're ready to checkout.",
          primaryButton: 'Log In',
          secondaryButton: 'Create Account',
          tertiaryButton: 'Keep Browsing',
        };
      default:
        return {
          heading: 'Welcome to your style journey! ✨',
          message: `Sign in to ${action} and access your personalized shopping experience.`,
          primaryButton: 'Log In',
          secondaryButton: 'Create Account',
          tertiaryButton: 'Keep Browsing',
        };
    }
  };

  const copy = getContextualCopy();

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
    onClose();
  };

  const handleRegister = () => {
    navigate('/register', { state: { from: location.pathname } });
    onClose();
  };

  const handleKeepBrowsing = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
        {/* Header with Close Button */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 pr-4">
            {/* Heading */}
            <h2 className="text-2xl font-bebas text-msq-purple-rich leading-tight">
              {copy.heading}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Message */}
        <div className="mb-7">
          <p className="text-base font-lato text-gray-700 leading-relaxed">{copy.message}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Button - Log In */}
          <button
            onClick={handleLogin}
            className="w-full bg-msq-purple-rich text-white py-3.5 px-6 rounded-xl font-lato font-semibold hover:bg-msq-purple transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {copy.primaryButton}
          </button>

          {/* Secondary Button - Create Account */}
          <button
            onClick={handleRegister}
            className="w-full bg-white text-msq-purple-rich py-3.5 px-6 rounded-xl font-lato font-semibold border-2 border-msq-purple-rich hover:bg-msq-purple-rich hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {copy.secondaryButton}
          </button>

          {/* Tertiary Button - Keep Browsing/Maybe Later */}
          <button
            onClick={handleKeepBrowsing}
            className="w-full text-gray-500 py-3 px-6 rounded-xl font-lato font-medium text-sm hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            {copy.tertiaryButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthActionModal;
