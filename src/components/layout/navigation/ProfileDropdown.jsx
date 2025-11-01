import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { UserRound, PackageCheck, ShoppingBag } from 'lucide-react';
import { useAuthState } from '../../../contexts/auth/useAuth.js';
import LoginButton from '../../auth/LoginButton.jsx';
import LogoutButton from '../../auth/LogoutButton.jsx';

const ProfileDropdown = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated } = useAuthState();

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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* UserRound Icon Trigger */}
      <button
        onClick={toggleDropdown}
        className="p-2 text-msq-gold-light cursor-pointer"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserRound size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            {isAuthenticated ? (
              <>
                {/* Authenticated User Section */}
                <div className="space-y-1">
                  {/* My Profile */}
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className="flex items-center gap-3 p-3 mx-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900"
                    role="menuitem"
                  >
                    <div className="p-2 bg-msq-purple-rich text-white rounded-full">
                      <UserRound size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-msq-purple-rich">My Profile</div>
                      <div className="text-xs text-gray-500">See your saved details</div>
                    </div>
                  </Link>

                  {/* My Orders */}
                  <Link
                    to="/orders"
                    onClick={closeDropdown}
                    className="flex items-center gap-3 p-3 mx-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900"
                    role="menuitem"
                  >
                    <div className="p-2 bg-msq-purple-rich text-white rounded-full">
                      <PackageCheck size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-msq-purple-rich">My Orders</div>
                      <div className="text-xs text-gray-500">See what's on its way</div>
                    </div>
                  </Link>

                  {/* Logout Button */}
                  <div className="pt-2 border-t border-gray-200 mx-2">
                    <LogoutButton
                      className="w-full justify-start p-3 text-left hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700"
                      onClick={closeDropdown}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Guest User Section */}
                <div className="space-y-1">
                  {/* Shop */}
                  <Link
                    to="/shop"
                    onClick={closeDropdown}
                    className="flex items-center gap-3 p-3 mx-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-900"
                    role="menuitem"
                  >
                    <div className="p-2 bg-msq-purple-rich text-white rounded-full">
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-msq-purple-rich">Shop</div>
                      <div className="text-xs text-gray-500">
                        Discover pieces that feel like you
                      </div>
                    </div>
                  </Link>

                  <div className="px-2">
                    <LoginButton
                      className="w-full justify-center p-3 mb-2 bg-msq-purple-rich text-white rounded-lg hover:opacity-70 transition-colors duration-200"
                      onClick={closeDropdown}
                    />
                    <Link
                      to="/register"
                      onClick={closeDropdown}
                      className="block w-full text-center p-3 border border-msq-purple-rich text-msq-purple-rich rounded-lg hover:bg-msq-purple-rich hover:text-white transition-colors duration-200"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
