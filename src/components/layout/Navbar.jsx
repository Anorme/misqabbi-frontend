import useMediaQuery from '../../hooks/useMediaQuery.js';

import NavDesktop from './navigation/NavDesktop.jsx';
import NavMobile from './navigation/NavMobile.jsx';

const NavBar = ({ showCategoryNavigation = false }) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  if (isMobile) return <NavMobile showCategoryNavigation={showCategoryNavigation} />;
  return <NavDesktop showCategoryNavigation={showCategoryNavigation} />;
};

export default NavBar;
