import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <div className="pt-18">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
