import { Link } from 'react-router';
import Button from '../ui/Button';
import { LoadStagger, StaggerItem } from '../ui/motion/MotionWrappers';
import HeroSlideshow from './HeroSlideshow';

const heroImageSrc =
  'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg';

const HeroMobile = () => (
  <section className="relative w-full h-[680px] overflow-hidden">
    <HeroSlideshow firstImageSrc={heroImageSrc} />

    <div className="absolute inset-0 bg-black/46" />
    <div className="relative z-10 h-full px-6 flex items-center justify-center">
      <LoadStagger className="max-w-md text-center">
        <StaggerItem
          as="h1"
          className="text-[38px] font-bebas text-white leading-tight tracking-wide"
        >
          STEP INTO TIMELESS ELEGANCE.
        </StaggerItem>
        <StaggerItem as="p" className="my-6 text-[16px] leading-7 text-white/90">
          Step into a world of elegance and charm, where every piece is designed to celebrate your
          unique beauty.
        </StaggerItem>
        <StaggerItem>
          <Button as={Link} to="/shop" variant="ghost" className="px-8 py-3 text-[24px] font-bebas">
            SHOP NOW
          </Button>
        </StaggerItem>
      </LoadStagger>
    </div>
  </section>
);

export default HeroMobile;
