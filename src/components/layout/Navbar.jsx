import useMediaQuery from '../../hooks/useMediaQuery.js';
import Banner from '../ui/Banner.jsx';
import NavDesktop from '../ui/NavDesktop.jsx';
import NavMobile from '../ui/NavMobile.jsx';

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <Banner text="SUMMER SALES ONGOING"></Banner>
      {isMobile ? <NavMobile /> : <NavDesktop />}
    </div>
  );
};

export default NavBar;
