import CtaSection from '../components/landingpage/CtaSection';
import HeroSection from '../components/landingpage/HeroSection';
import Preview from '../components/landingpage/Preview';
import Showcase from '../components/landingpage/Showcase';
import SectionWrapper from '../components/landingpage/SectionWrapper';
import SEO from '../components/SEO';
import StructuredData from '../components/seo/StructuredData';

const Home = () => {
  return (
    <div className="space-y-15">
      <SEO
        title="Uniquely Made for Her"
        description="Discover Misqabbi, a women's wear brand that's all about the girlies. Explore curated lounge and casual pieces made to empower her. Soft, elegant and uniquely crafted for her."
        canonicalPath="/"
        titleTemplate="Misqabbi | {title}"
      />
      <StructuredData
        type="Organization"
        data={{
          name: 'Misqabbi',
          description:
            "Misqabbi | Uniquely Made for Her. Women's wear brand that's all about the girlies.",
          logo: 'https://misqabbigh.com/images/Logo.png',
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          name: 'Misqabbi',
          description:
            "Misqabbi | Uniquely Made for Her. Women's wear brand that's all about the girlies.",
        }}
      />
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
