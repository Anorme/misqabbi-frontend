import { Link } from 'react-router';

const HeroDesktop = () => (
  <section
    className="w-full h-screen max-w-screen-6xl mx-auto bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://res.cloudinary.com/dyciw970t/image/upload/v1761952396/misqabbi/products/CSI_0053_sqkfoq.jpg')",
      // replace with actual image path
    }}
  >
    {/* Content container */}
    <div className=" z-10 h-full px-8 flex items-center justify-center">
      <div className="max-w-[1050px]">
        <h1 className="text-[64px] font-bebas text-white leading-tight text-nowrap">
          STEP INTO TIMELESS ELEGANCE.
        </h1>
        <p className="mt-8 text-[20px] leading-[25px] text-white/90">
          Step into a world of elegance and charm, where every piece is designed to celebrate your
          unique beauty and bring your dream wardrobe to life.
        </p>
        <Link
          to="/shop"
          className="mt-20 inline-block bg-msq-purple-rich hover:opacity-90 text-white text-[36px] font-bebas w-[321px] h-[89px] place-content-center rounded-[6px] transition"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  </section>
);

export default HeroDesktop;
