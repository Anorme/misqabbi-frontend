import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import useAuthAction from '../../../hooks/useAuthAction';

import AuthActionModal from '../../auth/AuthActionModal.jsx';
import ConnectedSearchBar from '../../search/ConnectedSearchBar.jsx';
import LandingSearchBar from '../../landingpage/LandingSearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavLinks from './NavLinks.jsx';
import NavActions from './NavActions.jsx';

const NavBar = () => {
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLogo variant="desktop" />
            <NavLinks />
          </div>

          {/* Center: Search Bar - Toggleable */}
          <div
            className={`flex-1 max-w-lg mx-8 transition-all duration-300 ease-in-out ${
              isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {isSearchOpen && (
              <>
                {isHomePage ? (
                  <LandingSearchBar
                    variant="desktop"
                    onClose={handleSearchClose}
                    isSearchOpen={isSearchOpen}
                    onSearchSubmit={handleSearchSubmit}
                    className="w-full"
                  />
                ) : (
                  <ConnectedSearchBar
                    variant="desktop"
                    onClose={handleSearchClose}
                    isSearchOpen={isSearchOpen}
                    onSearchSubmit={handleSearchSubmit}
                    className="w-full"
                  />
                )}
              </>
            )}
          </div>

          {/* Right: Actions */}
          <NavActions variant="desktop" onSearchToggle={handleSearchToggle} />
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </header>
  );
};

export default NavBar;
