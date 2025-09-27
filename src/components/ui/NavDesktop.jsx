import useAuthAction from '../../hooks/useAuthAction';

import AuthActionModal from '../auth/AuthActionModal.jsx';
import SearchBar from './SearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavActions from './NavActions.jsx';

const NavBar = () => {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between lg:h-16">
          {/* Logo */}
          <NavLogo variant="desktop" />

          {/* Search Bar */}
          <div className="md:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right Navigation */}
          <NavActions variant="desktop" />
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </header>
  );
};

export default NavBar;
