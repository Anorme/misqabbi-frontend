import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { UserRound, PackageCheck, ShoppingBag } from 'lucide-react';
import { useAuthState } from '../../../contexts/auth/useAuth.js';
import LoginButton from '../../auth/LoginButton.jsx';
import LogoutButton from '../../auth/LogoutButton.jsx';
import { MotionDropdown } from '../../ui/motion/MotionWrappers.jsx';

const ProfileDropdown = ({
  className = '',
  compact = false,
  buttonClassName = '',
  menuAlign = 'right',
  menuPlacement = 'bottom',
  onNavigate,
  showOrdersLink = true,
  showShopLink = true,
  triggerContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated } = useAuthState();
  const triggerClassName = triggerContent ? '' : compact ? 'p-1.5 sm:p-2' : 'p-2';
  const triggerIconSize = compact ? 18 : 20;
  const dropdownClassName = compact ? 'w-44' : 'w-52';
  const menuPaddingClassName = compact ? 'py-1.5' : 'py-2';
  const itemClassName = compact ? 'gap-2 p-2 mx-1.5' : 'gap-3 p-3 mx-2';
  const itemIconClassName = compact ? 'p-1.5' : 'p-2';
  const itemIconSize = compact ? 14 : 16;
  const titleClassName = compact ? 'text-xs' : 'text-sm';
  const descriptionClassName = compact ? 'text-[11px]' : 'text-xs';
  const authActionClassName = compact ? 'p-2 text-sm' : 'p-3';
  const menuAlignClassName = menuAlign === 'left' ? 'left-0' : 'right-0';
  const menuPlacementClassName = menuPlacement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
  const menuOriginClassName =
    menuPlacement === 'top'
      ? menuAlign === 'left'
        ? 'origin-bottom-left'
        : 'origin-bottom-right'
      : menuAlign === 'left'
        ? 'origin-top-left'
        : 'origin-top-right';

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleMenuAction = () => {
    closeDropdown();
    onNavigate?.();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* UserRound Icon Trigger */}
      <button
        onClick={toggleDropdown}
        className={`${triggerClassName} cursor-pointer transition-colors duration-200 ${buttonClassName || className || 'text-msq-gold hover:text-msq-gold-deep'}`}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerContent ?? <UserRound size={triggerIconSize} />}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDropdown
            placement={menuPlacement}
            className={`absolute ${menuAlignClassName} ${menuPlacementClassName} ${menuOriginClassName} ${dropdownClassName} bg-white rounded-lg shadow-lg border border-gray-200 z-50`}
            role="menu"
            aria-orientation="vertical"
          >
            <div className={menuPaddingClassName}>
              {isAuthenticated ? (
                <>
                  {/* Authenticated User Section */}
                  <div className="space-y-1">
                    {/* My Profile */}
                    <Link
                      to="/profile"
                      onClick={handleMenuAction}
                      className={`flex items-center ${itemClassName} rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900`}
                      role="menuitem"
                    >
                      <div
                        className={`${itemIconClassName} bg-msq-purple-rich text-white rounded-full`}
                      >
                        <UserRound size={itemIconSize} />
                      </div>
                      <div>
                        <div className={`font-medium ${titleClassName} text-msq-purple-rich`}>
                          My Profile
                        </div>
                        <div className={`${descriptionClassName} text-gray-500`}>
                          See your saved details
                        </div>
                      </div>
                    </Link>

                    {showOrdersLink && (
                      <Link
                        to="/orders"
                        onClick={handleMenuAction}
                        className={`flex items-center ${itemClassName} rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900`}
                        role="menuitem"
                      >
                        <div
                          className={`${itemIconClassName} bg-msq-purple-rich text-white rounded-full`}
                        >
                          <PackageCheck size={itemIconSize} />
                        </div>
                        <div>
                          <div className={`font-medium ${titleClassName} text-msq-purple-rich`}>
                            My Orders
                          </div>
                          <div className={`${descriptionClassName} text-gray-500`}>
                            See what's on its way
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Logout Button */}
                    <div className="pt-2 border-t border-gray-200 mx-2">
                      <LogoutButton
                        className={`w-full justify-start ${authActionClassName} text-left hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700`}
                        onClick={handleMenuAction}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest User Section */}
                  <div className="space-y-1">
                    {/* Shop */}
                    {showShopLink && (
                      <Link
                        to="/shop"
                        onClick={handleMenuAction}
                        className={`flex items-center ${itemClassName} rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900`}
                        role="menuitem"
                      >
                        <div
                          className={`${itemIconClassName} bg-msq-purple-rich text-white rounded-full`}
                        >
                          <ShoppingBag size={itemIconSize} />
                        </div>
                        <div>
                          <div className={`font-medium ${titleClassName} text-msq-purple-rich`}>
                            Shop
                          </div>
                          <div className={`${descriptionClassName} text-gray-500`}>
                            Discover pieces that feel like you
                          </div>
                        </div>
                      </Link>
                    )}

                    {showOrdersLink && (
                      <Link
                        to="/orders"
                        onClick={handleMenuAction}
                        className={`flex items-center ${itemClassName} rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900`}
                        role="menuitem"
                      >
                        <div
                          className={`${itemIconClassName} bg-msq-purple-rich text-white rounded-full`}
                        >
                          <PackageCheck size={itemIconSize} />
                        </div>
                        <div>
                          <div className={`font-medium ${titleClassName} text-msq-purple-rich`}>
                            My Orders
                          </div>
                          <div className={`${descriptionClassName} text-gray-500`}>
                            View your order history
                          </div>
                        </div>
                      </Link>
                    )}

                    <div className="px-2">
                      <LoginButton
                        className={`w-full justify-center ${authActionClassName} mb-2 bg-msq-purple-rich text-white rounded-lg hover:opacity-70 transition-colors duration-200`}
                        onClick={handleMenuAction}
                      />
                      <Link
                        to="/register"
                        onClick={handleMenuAction}
                        className={`block w-full text-center ${authActionClassName} border border-msq-purple-rich text-msq-purple-rich rounded-lg hover:bg-msq-purple-rich hover:text-white transition-colors duration-200`}
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </MotionDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
