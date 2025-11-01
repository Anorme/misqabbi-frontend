import { useEffect, useState } from 'react';

const PreviewPromo = () => {
  const [bgPosition, setBgPosition] = useState('center top');

  useEffect(() => {
    const handleResize = () => {
      // Position from bottom to ensure full height coverage
      setBgPosition(window.innerWidth < 768 ? 'center bottom' : 'center bottom');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-[120px] md:h-[450px] bg-cover bg-no-repeat"
      style={{
        backgroundPosition: bgPosition,
        backgroundImage:
          "url('https://res.cloudinary.com/dyciw970t/image/upload/v1761961275/misqabbi/products/CSI_9996_poumla_df0276.jpg')",
      }}
    >
      <div className=" bg-opacity-40 flex items-center justify-center absolute top-5 md:top-10 inset-x-0">
        <h2 className=" text-[25px] md:text-[96px] w-[220px] font-lato text-white md:w-[743px] md:h-[154px]"></h2>
      </div>
    </div>
  );
};

export default PreviewPromo;
