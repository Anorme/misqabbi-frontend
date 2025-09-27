import useMediaQuery from '../../hooks/useMediaQuery.js';
import CategoryNavigationDesktop from './CategoryNavigationDesktop.jsx';
import CategoryNavigationMobile from './CategoryNavigationMobile.jsx';

const CategoryNavigation = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <CategoryNavigationMobile /> : <CategoryNavigationDesktop />;
};

export default CategoryNavigation;
