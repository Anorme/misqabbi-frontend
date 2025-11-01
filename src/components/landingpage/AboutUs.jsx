const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Top Image Container */}
      <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dyciw970t/image/upload/v1761957956/CSI_0054_ffcm2z.jpg"
          alt="Misqabbi fashion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <section className="relative w-full bg-msq-purple-deep py-12 md:py-20 px-4 md:px-8 overflow-hidden">
        {/* Decorative Background Element */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <img
            src="/images/MsqAvatar.png"
            alt=""
            className="w-[400px] md:w-[600px] lg:w-[800px] h-auto opacity-10"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          {/* Decorative line above heading */}
          <div className="flex justify-center mb-4">
            <div className="w-16 md:w-24 h-px bg-white/30"></div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bebas uppercase tracking-wide mb-8 md:mb-12">
            ABOUT US
          </h2>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl font-lato leading-relaxed px-4 md:px-8">
            <p>
              We are a women-owned fashion brand creating made-to-measure pieces just for women.
              Each piece is made with you in mind — because we believe clothing should complement
              your body and inspire confidence, tailored to bring out the best in you.
            </p>

            <p>
              Beyond fashion, we're passionate about giving back. A portion of what we earn goes
              toward supporting kids in need — helping them get the strong start they deserve.
            </p>
          </div>

          {/* Tagline */}
          <div className="mt-10 md:mt-16">
            <p className="text-lg md:text-2xl lg:text-3xl font-lato font-medium">
              Made with{' '}
              <span className="relative inline-block">
                love
                {/* Decorative underline for "love" */}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-white/30 -mb-1"></span>
              </span>
              , made for you.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Image Container  */}
      <div className="w-full grid grid-cols-1">
        <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/v1761957946/CSI_9947_c7b1fa.jpg"
            alt="Misqabbi fashion"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
