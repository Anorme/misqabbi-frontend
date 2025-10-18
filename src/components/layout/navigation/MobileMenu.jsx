import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useAuthState } from '../../../contexts/auth/useAuth.js';
import { UserRound, PackageCheck, X } from 'lucide-react';
import LoginButton from '../../auth/LoginButton.jsx';
import LogoutButton from '../../auth/LogoutButton.jsx';

const MobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuthState();
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus first focusable element when menu opens
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Menu Panel */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 left-0 right-0 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{ willChange: 'transform' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-4 py-6 space-y-6">
          {isAuthenticated ? (
            <>
              {/* Authenticated User Section */}
              <div className="space-y-3">
                {/* My Profile */}
                <Link
                  to="/profile"
                  onClick={onClose}
                  ref={firstFocusableRef}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900"
                >
                  <div className="p-2 bg-msq-purple-rich text-white rounded-full">
                    <UserRound size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-msq-purple-rich">My Profile</div>
                    <div className="text-sm text-gray-500">See your saved details</div>
                  </div>
                </Link>

                {/* My Orders */}
                <Link
                  to="/orders"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900"
                >
                  <div className="p-2 bg-msq-purple-rich text-white rounded-full">
                    <PackageCheck size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-msq-purple-rich">My Orders</div>
                    <div className="text-sm text-gray-500">See what's on its way</div>
                  </div>
                </Link>

                {/* Logout Button */}
                <div className="pt-2 border-t border-gray-200">
                  <LogoutButton
                    className="w-full justify-start p-3 text-left hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={onClose}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Guest User Section */}
              <div className="space-y-3">
                <div className="text-center py-4">
                  <div className="text-gray-600 mb-4">Welcome to Misqabbi</div>
                  <div className="space-y-3">
                    <LoginButton
                      className="w-full justify-center p-3 mb-4 bg-msq-purple-rich text-white rounded-lg hover:bg-msq-purple transition-colors duration-200"
                      onClick={onClose}
                    />
                    <Link
                      to="/register"
                      onClick={onClose}
                      ref={firstFocusableRef}
                      className="block w-full text-center p-3 border border-msq-purple-rich text-msq-purple-rich rounded-lg hover:bg-msq-purple-rich hover:text-white transition-colors duration-200"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Universal Navigation Links */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/shop"
                onClick={onClose}
                className="block py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium">Shop</div>
                <div className="text-sm text-gray-500">Discover pieces that feel like you</div>
              </Link>
              <Link
                to="/about-us"
                onClick={onClose}
                className="block py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div>
                  <div className="font-medium">About Misqabbi</div>
                  <div className="text-sm text-gray-500">Our story & values</div>
                </div>
              </Link>
              <Link
                to="/help"
                onClick={onClose}
                className="block py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div>
                  <div className="font-medium">Customer Care</div>
                  <div className="text-sm text-gray-500">Shipping, returns & more</div>
                </div>
              </Link>
              <Link
                to="/contact-us"
                onClick={onClose}
                className="block py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div>
                  <div className="font-medium">Contact Us</div>
                  <div className="text-sm text-gray-500">Reach out directly</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
