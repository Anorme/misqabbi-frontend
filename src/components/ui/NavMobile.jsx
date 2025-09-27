import useAuthAction from '../../hooks/useAuthAction';

import AuthActionModal from '../auth/AuthActionModal.jsx';
import SearchBar from './SearchBar.jsx';
import NavLogo from './NavLogo.jsx';
import NavActions from './NavActions.jsx';

function NavMobile() {
  const { closeModal, isModalOpen, modalContext } = useAuthAction();

  return (
    <>
      <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo and Icons */}
        <div className="flex justify-between items-center pt-6">
          {/* Left Section: Logo */}
          <NavLogo variant="mobile" />

          {/* Right Section: Icons */}
          <NavActions
            variant="mobile"
            onMenuClick={() => {
              // TODO: Implement hamburger menu functionality
              console.log('Menu clicked - hamburger menu functionality to be implemented');
            }}
          />
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="">
          <SearchBar className="pt-4" />
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </>
  );
}

export default NavMobile;
