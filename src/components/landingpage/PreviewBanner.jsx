import { Link } from 'react-router';

import Button from '../ui/Button';
import { StaggerGroup, StaggerItem } from '../ui/motion/MotionWrappers';

const PreviewBanner = () => {
  return (
    <div className="relative w-full h-[120px] md:h-[450px] overflow-hidden">
      <img
        src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761961275/misqabbi/products/CSI_9996_poumla_df0276.jpg"
        alt="New arrival collection"
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
        decoding="async"
        width={1200}
        height={450}
      />
      <div className="absolute inset-0 bg-black/42" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <StaggerGroup className="text-center text-white md:space-y-4" staggerChildren={0.12}>
          <StaggerItem
            as="h1"
            className="text-[40px] md:text-[128px] font-lato leading-[71px] w-[350px] md:w-[854px]"
          >
            NEW ARRIVAL
          </StaggerItem>
          <StaggerItem>
            <Button
              as={Link}
              to="/shop"
              variant="primarySlideWhite"
              className="md:mt-12 px-5 py-3 font-lato"
            >
              SHOP COLLECTION
            </Button>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </div>
  );
};

export default PreviewBanner;
