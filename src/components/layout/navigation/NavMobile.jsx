import { lazy, Suspense, useState, useEffect } from 'react';
import useAuthAction from '../../../hooks/useAuthAction';
import useHomeNavbarState from '../../../hooks/useHomeNavbarState';
import useMediaQuery from '../../../hooks/useMediaQuery';

import AuthActionModal from '../../auth/AuthActionModal.jsx';
import ConnectedSearchBar from '../../search/ConnectedSearchBar.jsx';
import LandingSearchBar from '../../landingpage/LandingSearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavActions from './NavActions.jsx';
import MenuButton from './MenuButton.jsx';
import MobileMenu from './MobileMenu.jsx';

const CategoryNavigationMobile = lazy(() => import('./CategoryNavigationMobile.jsx'));
const CategoryNavigationTablet = lazy(() => import('./CategoryNavigationTablet.jsx'));

function NavMobile({ showCategoryNavigation = false }) {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { usesTransparentHeroNav, navSurfaceClass } = useHomeNavbarState();
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const iconClassName = 'text-msq-gold hover:text-msq-gold-deep';

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

  const inlineSearch = usesTransparentHeroNav ? (
    <LandingSearchBar
      variant="desktop"
      placeholder="Search"
      onClose={handleSearchClose}
      isSearchOpen={isSearchOpen}
      onSearchSubmit={handleSearchClose}
      className="w-full"
      inputClassName="h-8 bg-white/95 px-3 pr-9 text-sm shadow-sm placeholder:text-msq-gold-light/70 focus:ring-inset"
    />
  ) : (
    <ConnectedSearchBar
      variant="desktop"
      placeholder="Search"
      onClose={handleSearchClose}
      isSearchOpen={isSearchOpen}
      onSearchSubmit={handleSearchClose}
      className="w-full"
      inputClassName="h-8 bg-white/95 px-3 pr-9 text-sm shadow-sm placeholder:text-msq-gold-light/70 focus:ring-inset"
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
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 max-w-[100vw]  transition-colors duration-300 ${navSurfaceClass}`}
      >
        <div className="w-full overflow-x-hidden px-1.5 sm:px-3 lg:px-8">
          {/* Top Row: Logo and Icons */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center min-w-0 h-14">
            {/* Left Section: Menu */}
            <div className="justify-self-start min-w-0">
              <MenuButton onClick={handleMenuToggle} iconClassName={iconClassName} />
            </div>

            {/* Center Section: Logo */}
            <NavLogo variant="mobile" className="justify-self-center" />

            {/* Right Section: Icons */}
            <NavActions
              variant="mobile"
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
            {isTablet ? <CategoryNavigationTablet /> : <CategoryNavigationMobile />}
          </Suspense>
        )}
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default NavMobile;
