import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { useLocation } from 'react-router';

const MainLayout = ({ children, showCategoryNavigation = false }) => {
  const location = useLocation();
  const hasTransparentHeroNav = location.pathname === '/' || location.pathname === '/about-us';
  const contentOffsetClass = showCategoryNavigation ? 'pt-[104px] lg:pt-28' : 'pt-14 lg:pt-16';

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar showCategoryNavigation={showCategoryNavigation} />
      <div className={hasTransparentHeroNav ? '' : contentOffsetClass}>{children}</div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
