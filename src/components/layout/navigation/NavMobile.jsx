import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import useAuthAction from '../../../hooks/useAuthAction';

import AuthActionModal from '../../auth/AuthActionModal.jsx';
import ConnectedSearchBar from '../../search/ConnectedSearchBar.jsx';
import LandingSearchBar from '../../landingpage/LandingSearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavActions from './NavActions.jsx';
import MenuButton from './MenuButton.jsx';
import MobileMenu from './MobileMenu.jsx';

function NavMobile() {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close menu when opening search
    if (!isSearchOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close search when opening menu
    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  // Handle menu close
  const handleMenuClose = () => {
    setIsMenuOpen(false);
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
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm pt-2">
        <div className="max-w-screen-2xl px-2 lg:px-8">
          {/* Top Row: Logo and Icons */}
          <div className="flex justify-between items-center">
            {/* Left Section: Logo */}
            <div className="flex items-center space-x-2">
              <MenuButton onClick={handleMenuToggle} />
              <NavLogo variant="mobile" className="-ml-2" />
            </div>

            {/* Right Section: Icons */}
            <NavActions variant="mobile" onSearchToggle={handleSearchToggle} />
          </div>

          {/* Search Bar - Animated */}
          <div
            className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isSearchOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}
          `}
          >
            <div className="pt-4 pb-2">
              {isHomePage ? (
                <LandingSearchBar
                  variant="mobile"
                  onClose={handleSearchClose}
                  isSearchOpen={isSearchOpen}
                  onSearchSubmit={handleSearchClose}
                  className="w-full"
                />
              ) : (
                <ConnectedSearchBar
                  variant="mobile"
                  onClose={handleSearchClose}
                  isSearchOpen={isSearchOpen}
                  onSearchSubmit={handleSearchClose}
                  className="w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default NavMobile;
