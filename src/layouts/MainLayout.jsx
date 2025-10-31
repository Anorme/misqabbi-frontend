import NavBar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <SEO
        title="Uniquely Made for Her"
        description="Discover Misqabbi, a women's wear brand that's all about the girlies. Explore curated lounge and casual pieces made to empower her. Soft, elegant and uniquely crafted for her."
        canonicalPath="/"
        titleTemplate="Misqabbi | {title}"
      />
      <NavBar />
      <div className="pt-24">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
