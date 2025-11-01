import { Link } from 'react-router';

import MsqButton from './MsqButton';

const PreviewSplit = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Denim Section */}
        <div
          className="relative w-full h-[200px] md:h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dyciw970t/image/upload/v1761957976/misqabbi/products/CSI_0103_z9fxdo.jpg')",
          }}
        >
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white md:space-y-3">
              <h2 className="text-[38px] md:text-[64px] font-lato ">DRESSES</h2>
              <Link to="/category/dresses">
                <MsqButton label="SHOP DRESSES" variant="purple-rich" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ankara Section */}
        <div
          className="relative w-full h-[200px] md:h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dyciw970t/image/upload/v1761963749/misqabbi/landing-page/CSI_9913_lvhkas_62433c.jpg')",
          }}
        >
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
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
