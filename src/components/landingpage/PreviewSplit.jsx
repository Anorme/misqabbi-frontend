import { Link } from 'react-router';

import Button from '../ui/Button';
import { StaggerGroup, StaggerItem } from '../ui/motion/MotionWrappers';

const PreviewSplit = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Denim Section */}
        <div className="group relative w-full h-[200px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761957976/misqabbi/products/CSI_0103_z9fxdo.jpg"
            alt="Dresses collection"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center z-10">
            <StaggerGroup className="text-center text-white md:space-y-3" staggerChildren={0.12}>
              <StaggerItem as="h2" className="text-[38px] md:text-[64px] font-lato ">
                DRESSES
              </StaggerItem>
              <StaggerItem>
                <Button
                  as={Link}
                  to="/category/dresses"
                  variant="primarySlideWhite"
                  className="px-4 py-2 text-[12px] md:px-5 md:py-3 md:text-[16px] font-lato"
                >
                  SHOP DRESSES
                </Button>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>

        {/* Ankara Section */}
        <div className="group relative w-full h-[200px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761963749/misqabbi/landing-page/CSI_9913_lvhkas_62433c.jpg"
            alt="Skirts collection"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center z-10">
            <StaggerGroup className="text-center text-white  md:space-y-3" staggerChildren={0.12}>
              <StaggerItem as="h2" className="text-[38px] md:text-[64px] font-lato ">
                SKIRTS
              </StaggerItem>
              <StaggerItem>
                <Button
                  as={Link}
                  to="/category/skirts"
                  variant="primarySlideWhite"
                  className="px-4 py-2 text-[12px] md:px-5 md:py-3 md:text-[16px] font-lato"
                >
                  SHOP SKIRTS
                </Button>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSplit;
