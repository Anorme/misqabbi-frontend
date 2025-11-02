import { Link } from 'react-router';

import MsqButton from './MsqButton';

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
      <div className="relative z-10 h-full flex items-center justify-center">
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
