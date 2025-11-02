import { lazy, Suspense } from 'react';
import HeroSection from '../components/landingpage/HeroSection';
import SectionWrapper from '../components/landingpage/SectionWrapper';
import SEO from '../components/SEO';
import StructuredData from '../components/seo/StructuredData';

// Lazy load below-the-fold components to reduce initial bundle size
const Showcase = lazy(() => import('../components/landingpage/Showcase'));
const Preview = lazy(() => import('../components/landingpage/Preview'));
const CtaSection = lazy(() => import('../components/landingpage/CtaSection'));

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
        <Suspense fallback={null}>
          <Showcase />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper>
        <Suspense fallback={null}>
          <Preview />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper>
        <Suspense fallback={null}>
          <CtaSection />
        </Suspense>
      </SectionWrapper>
    </div>
  );
};

export default Home;
