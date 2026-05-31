import { Link } from 'react-router';

import Button from '../ui/Button';
import { StaggerGroup, StaggerItem } from '../ui/motion/MotionWrappers';

const PreviewPromo = () => {
  return (
    <div className="group relative w-full h-[200px] md:h-[500px] overflow-hidden">
      <img
        src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761961275/misqabbi/products/CSI_9996_poumla_df0276.jpg"
        alt="Promotional banner"
        className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
        decoding="async"
        width={1200}
        height={500}
      />
      <div className="absolute inset-0 bg-black/42" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <StaggerGroup
          className="flex w-full flex-col items-center justify-center space-y-3 px-4 text-center text-white md:space-y-4"
          staggerChildren={0.12}
        >
          <StaggerItem
            as="h2"
            className="mx-auto max-w-[min(92vw,854px)] text-balance font-lato text-[clamp(2.5rem,12vw,8rem)] leading-[0.9] tracking-tight"
          >
            MADE FOR YOU
          </StaggerItem>
          <StaggerItem>
            <Button
              as={Link}
              to="/bespoke"
              variant="primarySlideWhite"
              className="mt-1 px-4 py-2 text-xs font-lato sm:px-5 sm:py-2.5 sm:text-sm md:mt-8 md:px-5 md:py-3 md:text-base lg:mt-12"
            >
              SHOP BESPOKE
            </Button>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </div>
  );
};

export default PreviewPromo;
