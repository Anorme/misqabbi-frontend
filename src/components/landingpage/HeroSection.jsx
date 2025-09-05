import HeroDesktop from './HeroDesktop';
import HeroMobile from './HeroMobile';

import useMediaQuery from '../../hooks/useMediaQuery';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
};

export default HeroSection;
