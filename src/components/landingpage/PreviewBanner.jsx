import { useEffect, useState } from 'react';

import { Link } from 'react-router';

import MsqButton from './MsqButton';

const PreviewBanner = () => {
  const [bgPosition, setBgPosition] = useState('center top');

  useEffect(() => {
    const handleResize = () => {
      setBgPosition(window.innerWidth < 768 ? 'center top' : 'center top');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-[120px] md:h-[450px] bg-cover"
      style={{
        backgroundPosition: bgPosition,
        backgroundImage:
          "url('https://res.cloudinary.com/dyciw970t/image/upload/v1761961275/misqabbi/products/CSI_9996_poumla_df0276.jpg')",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white md:space-y-4">
          <h1 className="text-[40px] md:text-[128px] font-lato leading-[71px] w-[350px] md:w-[854px]">
            NEW ARRIVAL
          </h1>
          <Link to="/shop">
            <MsqButton label="SHOP COLLECTION" variant="purple-rich" className=" md:mt-12  " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;
