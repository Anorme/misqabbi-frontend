import useMediaQuery from '../../hooks/useMediaQuery.js';

import NavDesktop from './navigation/NavDesktop.jsx';
import NavMobile from './navigation/NavMobile.jsx';
import NavTablet from './navigation/NavTablet.jsx';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  if (isMobile) return <NavMobile />;
  if (isTablet) return <NavTablet />;
  return <NavDesktop />;
};

export default NavBar;
