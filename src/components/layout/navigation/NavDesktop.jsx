import { lazy, Suspense, useState, useEffect } from 'react';
import useAuthAction from '../../../hooks/useAuthAction';
import useHomeNavbarState from '../../../hooks/useHomeNavbarState';

import AuthActionModal from '../../auth/AuthActionModal.jsx';
import ConnectedSearchBar from '../../search/ConnectedSearchBar.jsx';
import LandingSearchBar from '../../landingpage/LandingSearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavLinks from './NavLinks.jsx';
import NavActions from './NavActions.jsx';

const CategoryNavigationDesktop = lazy(() => import('./CategoryNavigationDesktop.jsx'));

const NavBar = ({ showCategoryNavigation = false }) => {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();
  const { usesTransparentHeroNav, isSolid, navSurfaceClass } = useHomeNavbarState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const iconClassName = 'text-msq-gold hover:text-msq-gold-deep';
  const linkTone = usesTransparentHeroNav && !isSolid ? 'transparent' : 'solid';

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

  const inlineSearch = usesTransparentHeroNav ? (
    <LandingSearchBar
      variant="desktop"
      placeholder="Search"
      onClose={handleSearchClose}
      isSearchOpen={isSearchOpen}
      onSearchSubmit={handleSearchSubmit}
      className="w-full"
      inputClassName="h-9 bg-white/95 px-3 pr-9 text-sm shadow-sm placeholder:text-msq-gold-light/70"
    />
  ) : (
    <ConnectedSearchBar
      variant="desktop"
      placeholder="Search"
      onClose={handleSearchClose}
      isSearchOpen={isSearchOpen}
      onSearchSubmit={handleSearchSubmit}
      className="w-full"
      inputClassName="h-9 bg-white/95 px-3 pr-9 text-sm shadow-sm placeholder:text-msq-gold-light/70"
    />
  );

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${navSurfaceClass}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 md:h-16">
          {/* Left: Navigation Links */}
          <div className="justify-self-start">
            <NavLinks tone={linkTone} />
          </div>

          {/* Center: Logo */}
          <NavLogo variant="desktop" className="justify-self-center" />

          {/* Right: Actions */}
          <NavActions
            variant="desktop"
            className="justify-self-end"
            inlineSearch={inlineSearch}
            isSearchOpen={isSearchOpen}
            onSearchToggle={handleSearchToggle}
            iconClassName={iconClassName}
          />
        </div>
      </div>
      {showCategoryNavigation && (
        <Suspense fallback={null}>
          <CategoryNavigationDesktop />
        </Suspense>
      )}

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </header>
  );
};

export default NavBar;
