import { Link } from 'react-router';

const HeroTablet = () => (
  <section className="relative w-full h-[600px] md:h-[700px] max-w-screen-6xl mx-auto overflow-hidden">
    {/* Hero image */}
    <img
      src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg"
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      loading="eager"
    />
    {/* Content container */}
    <div className="relative z-10 h-full px-6 sm:px-8 flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-[40px] sm:text-[48px] font-bebas text-white leading-tight">
          STEP INTO TIMELESS ELEGANCE.
        </h1>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/90">
          Step into a world of elegance and charm, where every piece is designed to celebrate your
          unique beauty and bring your dream wardrobe to life.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-msq-purple-rich hover:opacity-90 text-white text-xl sm:text-2xl font-bebas px-6 py-3 sm:px-8 sm:py-4 rounded-[6px] transition"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  </section>
);

export default HeroTablet;
