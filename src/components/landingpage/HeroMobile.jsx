import { Link } from 'react-router';

const HeroMobile = () => (
  <section className="relative w-full h-[680px] overflow-hidden">
    <img
      src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_800,c_limit/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg"
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      loading="eager"
    />

    <div className="absolute inset-0 bg-black/46" />
    <div className="relative z-10 h-full px-6 flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-[38px] font-bebas text-white leading-tight tracking-wide">
          STEP INTO TIMELESS ELEGANCE.
        </h1>
        <p className="my-6 text-[16px] leading-7 text-white/90">
          Step into a world of elegance and charm, where every piece is designed to celebrate your
          unique beauty.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-msq-purple-rich hover:opacity-90 text-white text-[24px] font-bebas px-8 py-3 rounded-[6px] transition"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  </section>
);

export default HeroMobile;
