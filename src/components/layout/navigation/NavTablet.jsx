import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import useAuthAction from '../../../hooks/useAuthAction';

import AuthActionModal from '../../auth/AuthActionModal.jsx';
import ConnectedSearchBar from '../../search/ConnectedSearchBar.jsx';
import LandingSearchBar from '../../landingpage/LandingSearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavLinks from './NavLinks.jsx';
import NavActions from './NavActions.jsx';

const NavTablet = () => {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  // Handle search submit (close search bar)
  const handleSearchSubmit = () => {
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
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm pt-2">
        <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Nav Links, and Icons */}
          <div className="flex justify-between items-center h-14">
            {/* Left Section: Logo and Nav Links */}
            <div className="flex items-center gap-0">
              <NavLogo variant="desktop" />
              <NavLinks />
            </div>

            {/* Right Section: Icons */}
            <NavActions variant="mobile" onSearchToggle={handleSearchToggle} />
          </div>

          {/* Search Bar - Animated (Mobile Style) */}
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
                  onSearchSubmit={handleSearchSubmit}
                  className="w-full"
                />
              ) : (
                <ConnectedSearchBar
                  variant="mobile"
                  onClose={handleSearchClose}
                  isSearchOpen={isSearchOpen}
                  onSearchSubmit={handleSearchSubmit}
                  className="w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </>
  );
};

export default NavTablet;
