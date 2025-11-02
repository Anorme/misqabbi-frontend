import { Link } from 'react-router';

import MsqButton from './MsqButton';

const PreviewSplit = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Denim Section */}
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761957976/misqabbi/products/CSI_0103_z9fxdo.jpg"
            alt="Dresses collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center z-10">
            <div className="text-center text-white md:space-y-3">
              <h2 className="text-[38px] md:text-[64px] font-lato ">DRESSES</h2>
              <Link to="/category/dresses">
                <MsqButton label="SHOP DRESSES" variant="purple-rich" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ankara Section */}
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761963749/misqabbi/landing-page/CSI_9913_lvhkas_62433c.jpg"
            alt="Skirts collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center z-10">
            <div className="text-center text-white  md:space-y-3">
              <h2 className="text-[38px] md:text-[64px] font-lato ">SKIRTS</h2>
              <Link to="/category/skirts">
                <MsqButton label="SHOP SKIRTS" variant="purple-rich" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSplit;
