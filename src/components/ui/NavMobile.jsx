import { useState, useEffect } from 'react';
import useAuthAction from '../../hooks/useAuthAction';

import AuthActionModal from '../auth/AuthActionModal.jsx';
import SearchBar from './SearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavActions from './NavActions.jsx';

function NavMobile() {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  // Close search on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    // Debounce scroll handler
    let timeoutId;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [isSearchOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo and Icons */}
          <div className="flex justify-between items-center pt-6">
            {/* Left Section: Logo */}
            <NavLogo variant="mobile" />

            {/* Right Section: Icons */}
            <NavActions
              variant="mobile"
              isSearchOpen={isSearchOpen}
              onSearchToggle={handleSearchToggle}
              onMenuClick={() => {
                // TODO: Implement hamburger menu functionality
                console.log('Menu clicked - hamburger menu functionality to be implemented');
              }}
            />
          </div>

          {/* Search Bar - Animated */}
          <div
            className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isSearchOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}
          `}
          >
            <div className="pt-4 pb-2">
              <SearchBar
                variant="mobile"
                onClose={handleSearchClose}
                isSearchOpen={isSearchOpen}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </>
  );
}

export default NavMobile;
