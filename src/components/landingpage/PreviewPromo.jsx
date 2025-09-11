import { useEffect, useState } from 'react';

const PreviewPromo = () => {
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
      className="relative w-full h-[122px] md:h-[417px] bg-cover bg-top md:bg-center"
      style={{
        backgroundPosition: bgPosition,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1648322032206-888c91d99616?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className=" bg-opacity-40 flex items-center justify-center absolute top-5 md:top-10 inset-x-0">
        <h2 className=" text-[25px] md:text-[96px] w-[220px] font-lato text-white md:w-[743px] md:h-[154px]">
          Spring Collection 30% OFF
        </h2>
      </div>
    </div>
  );
};

export default PreviewPromo;
