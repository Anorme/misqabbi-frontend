import useMediaQuery from '../../../hooks/useMediaQuery.js';
import CategoryNavigationDesktop from './CategoryNavigationDesktop.jsx';
import CategoryNavigationMobile from './CategoryNavigationMobile.jsx';
import CategoryNavigationTablet from './CategoryNavigationTablet.jsx';

const CategoryNavigation = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  if (isMobile) return <CategoryNavigationMobile />;
  if (isTablet) return <CategoryNavigationTablet />;
  return <CategoryNavigationDesktop />;
};

export default CategoryNavigation;
