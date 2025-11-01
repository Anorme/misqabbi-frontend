import { Link } from 'react-router';

const HeroMobile = () => (
  <section className="w-full h-full md:h-[700px]">
    <img
      src="https://res.cloudinary.com/dyciw970t/image/upload/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg"
      alt="Hero Image"
      className="w-full max-w-full h-full mx-auto object-cover"
    />

    <div className=" px-6 py-8 text-center">
      <h1 className="text-[24px] font-bebas text-msq-purple-light leading-tight text-nowrap">
        STEP INTO TIMELESS ELEGANCE.
      </h1>
      <p className="my-4 text-[14px] leading-[25px] text-msq-purple-fade">
        Celebrate your beauty with elegant pieces that bring your dream wardrobe to life.
      </p>
      <Link
        to="/shop"
        className=" bg-msq-purple-rich hover:opacity-90 text-white text-[16px] font-bebas px-3 py-2 rounded-[6px] transition"
      >
        SHOP NOW
      </Link>
    </div>
  </section>
);

export default HeroMobile;
