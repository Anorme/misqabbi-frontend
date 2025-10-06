import { Link } from 'react-router';

const HeroMobile = () => (
  <section className="w-full h-full md:h-[700px]">
    <img
      src="https://images.unsplash.com/photo-1546536133-d1b07a9c768e?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Hero Image"
      className="w-full max-w-full h-[216px] mx-auto object-cover"
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
