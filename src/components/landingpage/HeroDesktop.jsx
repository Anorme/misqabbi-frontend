import { Link } from 'react-router';

const HeroDesktop = () => (
  <section
    className="w-full h-[600px] md:h-[700px] bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1546536133-d1b07a9c768e?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
