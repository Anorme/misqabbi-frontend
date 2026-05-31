import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLocation } from 'react-router';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <div className={isHomePage ? '' : 'pt-18 md:pt-16'}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
