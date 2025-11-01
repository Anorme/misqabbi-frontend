import { useEffect, useState } from 'react';

import { Link } from 'react-router';

import MsqButton from './MsqButton';

const PreviewBanner = () => {
  const [bgPosition, setBgPosition] = useState('center -100px');

  useEffect(() => {
    const handleResize = () => {
      setBgPosition(window.innerWidth < 768 ? 'center -100px' : 'center -340px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-[122px] md:h-[500px] bg-cover bg-top md:bg-center "
      style={{
        backgroundPosition: bgPosition,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1648322032202-73cb85f354be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'",
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
