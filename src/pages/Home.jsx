import CtaSection from '../components/landingpage/CtaSection';
import HeroSection from '../components/landingpage/HeroSection';
import Preview from '../components/landingpage/Preview';
import Showcase from '../components/landingpage/Showcase';
import SectionWrapper from '../components/landingpage/SectionWrapper';

const Home = () => {
  return (
    <div className="space-y-15">
      <HeroSection />
      <SectionWrapper>
        <Showcase />
      </SectionWrapper>
      <SectionWrapper>
        <Preview />
      </SectionWrapper>
      <SectionWrapper>
        <CtaSection />
      </SectionWrapper>
    </div>
  );
};

export default Home;
