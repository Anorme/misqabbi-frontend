import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { useLocation } from 'react-router';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hasTransparentHeroNav = location.pathname === '/' || location.pathname === '/about-us';

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <div className={hasTransparentHeroNav ? '' : 'pt-18 md:pt-16'}>{children}</div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
