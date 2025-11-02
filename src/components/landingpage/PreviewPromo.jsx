const PreviewPromo = () => {
  return (
    <div className="relative w-full h-[120px] md:h-[450px] overflow-hidden">
      <img
        src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761961275/misqabbi/products/CSI_9996_poumla_df0276.jpg"
        alt="Promotional banner"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        loading="lazy"
        decoding="async"
        width={1200}
        height={450}
      />
      <div className="relative z-10 bg-opacity-40 flex items-center justify-center top-5 md:top-10 inset-x-0">
        <h2 className=" text-[25px] md:text-[96px] w-[220px] font-lato text-white md:w-[743px] md:h-[154px]"></h2>
      </div>
    </div>
  );
};

export default PreviewPromo;
