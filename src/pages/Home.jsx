import CtaSection from '../components/landingpage/CtaSection';
import HeroSection from '../components/landingpage/HeroSection';
import Preview from '../components/landingpage/Preview';
import Showcase from '../components/landingpage/Showcase';

const Home = () => {
  return (
    <div className="space-y-15">
      <HeroSection />
      <Showcase />
      <Preview />
      <CtaSection />
    </div>
  );
};

export default Home;
