import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Sparkles, Users, Scissors } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../SEO';
import Button from '../ui/Button';
import StickyPanBackgroundSection from '../ui/StickyPanBackgroundSection';
import {
  LoadStagger,
  StaggerGroup,
  StaggerItem,
  ViewportReveal,
} from '../ui/motion/MotionWrappers';
import { fadeUp, slideFromLeft, slideFromRight } from '../ui/motion/motionPresets';

const HERO_IMAGE =
  'https://res.cloudinary.com/dtmz5ecud/image/upload/f_auto,q_auto,w_1920,c_limit/v1780242380/CSI_9947_jmir0d.jpg';

const ABOUT_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/f_auto,q_auto,w_900,c_limit/v1780239162/CSI_0017_encvnl.jpg',
    alt: 'Misqabbi bespoke fashion detail',
  },
  {
    src: 'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1762231487/CSI_0014_cvmuyd.jpg',
    alt: 'Misqabbi fashion',
  },
];

const COMMUNITY_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/f_auto,q_auto,w_1200,c_limit/v1766540736/misqabbi/products/hyddehnknbjzu4coynfy.jpg',
    alt: 'Misqabbi layered print skirt',
  },
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/f_auto,q_auto,w_1200,c_limit/v1766540516/misqabbi/products/gocpqockqvmry2wkl7ub.jpg',
    alt: 'Misqabbi black dress design',
  },
];

const AboutHero = () => (
  <section className="relative h-[620px] w-full overflow-hidden md:h-[700px] lg:h-screen">
    <img
      src={HERO_IMAGE}
      alt="Misqabbi community"
      className="absolute inset-0 h-full w-full object-cover object-center"
      fetchPriority="high"
      loading="eager"
    />
    <div className="absolute inset-0 bg-black/48" />
    <div className="relative z-10 flex h-full items-center justify-center px-6 text-center sm:px-8">
      <LoadStagger className="mx-auto max-w-3xl">
        <StaggerItem
          as="h1"
          className="font-bebas text-[44px] leading-tight tracking-wide text-white sm:text-[56px] md:text-[68px] lg:text-[80px]"
        >
          Our Story
        </StaggerItem>
        <StaggerItem className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg md:text-xl">
          Crafting made-to-measure fashion that celebrates your unique story
        </StaggerItem>
      </LoadStagger>
    </div>
  </section>
);

const AboutMobileCarousel = ({ images = ABOUT_IMAGES, className = '' }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={`w-full ${className}`}>
      <div ref={emblaRef} className="overflow-hidden shadow-lg">
        <div className="flex touch-pan-y">
          {images.map(image => (
            <div key={image.src} className="min-w-0 flex-[0_0_100%]">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-label="About image slides">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex ? 'w-8 bg-msq-purple-rich' : 'w-2.5 bg-msq-purple-rich/30'
            }`}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
};

const StackedOffsetImages = ({ images = ABOUT_IMAGES, className = '' }) => (
  <div
    className={`relative mx-auto h-[520px] max-w-xl overflow-visible lg:grid lg:h-auto lg:max-w-2xl lg:grid-cols-2 lg:items-start lg:gap-0 lg:pb-8 ${className}`}
  >
    <div className="absolute right-0 top-0 h-[76%] w-[76%] overflow-hidden shadow-lg lg:static lg:h-auto lg:w-full lg:aspect-[3/4]">
      <img src={images[0].src} alt={images[0].alt} className="h-full w-full object-cover" />
    </div>
    <div className="absolute bottom-0 left-0 h-[74%] w-[74%] overflow-hidden shadow-2xl lg:static lg:h-auto lg:w-full lg:aspect-[3/4] lg:translate-y-8">
      <img src={images[1].src} alt={images[1].alt} className="h-full w-full object-cover" />
    </div>
  </div>
);

const ResponsiveImageShowcase = ({ images = ABOUT_IMAGES, className = '' }) => (
  <div className={className}>
    <AboutMobileCarousel images={images} className="md:hidden" />
    <StackedOffsetImages images={images} className="hidden md:block" />
  </div>
);

const AboutUs = () => {
  return (
    <main className="w-full font-lato">
      <SEO
        title="About Us"
        description="Learn about Misqabbi, a women-owned fashion brand crafting made-to-measure and bespoke pieces that honor real bodies and real stories."
        canonicalPath="/about"
      />

      <AboutHero />

      {/* Intro Section - Split Layout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ViewportReveal variants={slideFromLeft} className="order-2 md:order-1">
            <StaggerGroup className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
              <StaggerItem
                as="h2"
                variants={fadeUp}
                className="font-bebas text-2xl sm:text-3xl md:text-4xl text-msq-purple-rich"
              >
                Who We Are
              </StaggerItem>
              <StaggerItem variants={fadeUp} className="md:hidden">
                <AboutMobileCarousel />
              </StaggerItem>
              <StaggerItem as="p" variants={fadeUp} className="text-sm sm:text-base lg:text-lg">
                Misqabbi is a women-owned fashion brand crafting made-to-measure and bespoke pieces
                that honor real bodies and real stories. Every garment is designed with you in mind,
                tailored to fit, flatter, and empower.
              </StaggerItem>
              <StaggerItem as="p" variants={fadeUp} className="text-sm sm:text-base lg:text-lg">
                We believe clothing should celebrate your shape, reflect your spirit, and help you
                feel like the main character in your life.
              </StaggerItem>
            </StaggerGroup>
          </ViewportReveal>
          <ViewportReveal
            variants={slideFromRight}
            className="order-2 hidden overflow-visible md:block"
          >
            <StackedOffsetImages />
          </ViewportReveal>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="w-full bg-gradient-to-br from-msq-purple-light/5 to-msq-purple-rich/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ViewportReveal
            as="h2"
            variants={fadeUp}
            className="font-bebas text-2xl sm:text-3xl md:text-4xl text-msq-purple-rich text-center mb-8 md:mb-12"
          >
            What We Stand For
          </ViewportReveal>
          <StaggerGroup className="grid md:grid-cols-3 gap-6 md:gap-8" staggerChildren={0.1}>
            {/* Value 1: Made-to-Measure */}
            <StaggerItem variants={fadeUp} className="p-2 md:p-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="mb-4">
                  <Scissors className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Made-to-Measure Excellence
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                Every piece is crafted specially for you, ensuring a perfect fit that celebrates
                your style.
              </p>
            </StaggerItem>

            {/* Value 2: Empowerment */}
            <StaggerItem variants={fadeUp} className="p-2 md:p-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="mb-4">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Empowerment Through Fashion
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                We believe clothing should help you feel like the main character you are.
              </p>
            </StaggerItem>

            {/* Value 3: Community */}
            <StaggerItem variants={fadeUp} className="p-2 md:p-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="mb-4">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Building Community
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                We create space for women to feel seen, celebrated, and connected.
              </p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* Community Section - Reverse Split Layout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ViewportReveal variants={slideFromLeft} className="overflow-visible">
            <ResponsiveImageShowcase images={COMMUNITY_IMAGES} />
          </ViewportReveal>
          <ViewportReveal variants={slideFromRight}>
            <StaggerGroup className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
              <StaggerItem
                as="h2"
                variants={fadeUp}
                className="font-bebas text-2xl sm:text-3xl md:text-4xl text-msq-purple-rich"
              >
                Building Community Together
              </StaggerItem>
              <StaggerItem as="p" variants={fadeUp} className="text-sm sm:text-base lg:text-lg">
                We&rsquo;re building a community where women support and uplift each other. Through
                shared stories, intentional design, and collective care, we create space for women
                to feel seen, celebrated, and connected.
              </StaggerItem>
              <StaggerItem as="p" variants={fadeUp} className="text-sm sm:text-base lg:text-lg">
                Every piece we create is crafted with intention, care, and precision. We honor real
                bodies and real stories, ensuring that every garment is designed to fit, flatter,
                and empower you.
              </StaggerItem>
            </StaggerGroup>
          </ViewportReveal>
        </div>
      </section>

      {/* CTA Section - sticky scroll-scrubbed background between light sections */}
      <StickyPanBackgroundSection
        backgroundImage="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1600,c_limit/v1761957956/CSI_0054_ffcm2z.jpg"
        panScrollRunwayVh={90}
        panRangePercent={26}
        scrimOpacity={0.5}
      >
        <StaggerGroup className="max-w-4xl mx-auto text-center w-full">
          <StaggerItem
            as="h2"
            variants={fadeUp}
            className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6"
          >
            Ready to Start Your Journey?
          </StaggerItem>
          <StaggerItem
            as="p"
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-white/95 mb-6 md:mb-8 max-w-2xl mx-auto"
          >
            Discover our collection and experience fashion designed specifically for you.
          </StaggerItem>
          <StaggerItem variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/shop"
              variant="primarySlideTransparent"
              className="px-8 py-3 text-[24px] font-bebas sm:px-8 sm:py-4 sm:text-2xl lg:px-10 lg:py-4 lg:text-[30px] rounded-lg text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-msq-purple-rich"
            >
              Browse Collection
            </Button>
            <Button
              as={Link}
              to="/bespoke"
              variant="ghost"
              className="px-8 py-3 text-[24px] font-bebas sm:px-8 sm:py-4 sm:text-2xl lg:px-10 lg:py-4 lg:text-[30px] rounded-lg text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-msq-purple-rich"
            >
              Create Your Look
            </Button>
          </StaggerItem>
        </StaggerGroup>
      </StickyPanBackgroundSection>
    </main>
  );
};

export default AboutUs;
