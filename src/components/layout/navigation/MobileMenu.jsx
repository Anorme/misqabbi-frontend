import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router';
import { PackageCheck, UserRound } from 'lucide-react';
import { useAuthState } from '../../../contexts/auth/useAuth.js';
import CloseButton from '../../ui/CloseButton';
import { SlidePanel } from '../../ui/motion/MotionWrappers.jsx';
import NavLogo from './NavLogo.jsx';
import ProfileDropdown from './ProfileDropdown.jsx';

const MotionOverlay = motion.div;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionOverlay
          className="fixed inset-0 z-50 bg-black/40"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Menu Panel */}
          <SlidePanel
            ref={menuRef}
            isOpen={isOpen}
            className="fixed top-0 left-0 bottom-0 flex w-[min(84vw,22rem)] flex-col overflow-y-auto bg-white shadow-lg"
            style={{ willChange: 'transform' }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <CloseButton
                onClose={onClose}
                size={24}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                ariaLabel="Close menu"
              />
              <NavLogo variant="mobile" className="absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Menu Content */}
            <div className="flex flex-1 flex-col px-4 py-6">
              {/* Universal Navigation Links */}
              <div>
                <div className="space-y-2">
                  <Link
                    to="/shop"
                    onClick={onClose}
                    ref={firstFocusableRef}
                    className="block py-3 px-3 text-msq-purple-rich hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div className="font-medium">Shop</div>
                    <div className="text-sm text-gray-500">Discover pieces that feel like you</div>
                  </Link>
                  <Link
                    to="/bespoke"
                    onClick={onClose}
                    className="block py-3 px-3 text-msq-purple-rich hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div className="font-medium">Bespoke</div>
                    <div className="text-sm text-gray-500">Custom pieces crafted for you</div>
                  </Link>
                  <Link
                    to="/about-us"
                    onClick={onClose}
                    className="block py-3 px-3 text-msq-purple-rich hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div>
                      <div className="font-medium">About Misqabbi</div>
                      <div className="text-sm text-gray-500">Our story & values</div>
                    </div>
                  </Link>
                  <Link
                    to="/faqs"
                    onClick={onClose}
                    className="block py-3 px-3 text-msq-purple-rich hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div>
                      <div className="font-medium">Customer Care</div>
                      <div className="text-sm text-gray-500">Shipping, returns & more</div>
                    </div>
                  </Link>
                  <Link
                    to="/contact-us"
                    onClick={onClose}
                    className="block py-3 px-3 text-msq-purple-rich hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div>
                      <div className="font-medium">Contact Us</div>
                      <div className="text-sm text-gray-500">Reach out directly</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="-mx-4 space-y-3 border-t border-gray-200 pt-4">
                  <ProfileDropdown
                    className="block"
                    buttonClassName="block w-full cursor-pointer rounded-lg px-4 py-2 text-left text-gray-900 transition-colors duration-200 hover:bg-gray-100"
                    compact
                    menuAlign="right"
                    menuPlacement="top"
                    onNavigate={onClose}
                    showOrdersLink={false}
                    showShopLink={false}
                    triggerContent={
                      <span className="block">
                        <span className="flex items-center justify-between gap-4">
                          <span className="font-medium text-msq-purple-rich">Account</span>
                          <span className="shrink-0 rounded-full p-1.5 text-msq-purple-rich transition-colors duration-200 hover:bg-gray-100 hover:text-msq-purple sm:p-2">
                            <UserRound size={18} />
                          </span>
                        </span>
                        <span className="block text-left text-sm text-gray-500">
                          {isAuthenticated ? 'Profile & logout' : 'Login or create account'}
                        </span>
                      </span>
                    }
                  />

                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="block rounded-lg px-4 py-2 text-gray-900 transition-colors duration-200 hover:bg-gray-100"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-medium text-msq-purple-rich">My Orders</div>
                        <span className="shrink-0 rounded-full p-1.5 text-msq-purple-rich transition-colors duration-200 hover:bg-gray-100 hover:text-msq-purple sm:p-2">
                          <PackageCheck size={18} />
                        </span>
                      </div>
                      <div className="text-left text-sm text-gray-500">
                        {isAuthenticated ? "See what's on its way" : 'View your order history'}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SlidePanel>
        </MotionOverlay>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
