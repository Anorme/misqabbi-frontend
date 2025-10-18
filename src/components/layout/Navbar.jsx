import useMediaQuery from '../../hooks/useMediaQuery.js';

import NavDesktop from './navigation/NavDesktop.jsx';
import NavMobile from './navigation/NavMobile.jsx';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <div>{isMobile ? <NavMobile /> : <NavDesktop />}</div>;
};

export default NavBar;
