import { Link } from 'react-router';
import Button from '../ui/Button';
import { LoadStagger, StaggerItem } from '../ui/motion/MotionWrappers';

const HeroTablet = () => (
  <section className="relative w-full h-[600px] md:h-[700px] max-w-screen-6xl mx-auto overflow-hidden">
    {/* Hero image */}
    <img
      src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg"
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      loading="eager"
    />
    <div className="absolute inset-0 bg-black/44" />
    {/* Content container */}
    <div className="relative z-10 h-full px-6 sm:px-8 flex items-center justify-center">
      <LoadStagger className="max-w-2xl text-center">
        <StaggerItem
          as="h1"
          className="text-[40px] sm:text-[48px] font-bebas text-white leading-tight"
        >
          STEP INTO TIMELESS ELEGANCE.
        </StaggerItem>
        <StaggerItem as="p" className="mt-6 text-base sm:text-lg leading-relaxed text-white/90">
          Step into a world of elegance and charm, where every piece is designed to celebrate your
          unique beauty and bring your dream wardrobe to life.
        </StaggerItem>
        <StaggerItem>
          <Button
            as={Link}
            to="/shop"
            variant="ghost"
            className="mt-8 px-6 py-3 text-xl sm:px-8 sm:py-4 sm:text-2xl font-bebas"
          >
            SHOP NOW
          </Button>
        </StaggerItem>
      </LoadStagger>
    </div>
  </section>
);

export default HeroTablet;
