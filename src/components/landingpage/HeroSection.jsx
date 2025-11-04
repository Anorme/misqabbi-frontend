import HeroDesktop from './HeroDesktop';
import HeroMobile from './HeroMobile';
import HeroTablet from './HeroTablet';

import useMediaQuery from '../../hooks/useMediaQuery';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  if (isMobile) return <HeroMobile />;
  if (isTablet) return <HeroTablet />;
  return <HeroDesktop />;
};

export default HeroSection;
