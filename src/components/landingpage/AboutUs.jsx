const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Top Image Container */}
      <div className="w-full h-[150px] md:h-[200px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761957956/CSI_0054_ffcm2z.jpg"
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
            <div className="w-16 md:w-24 h-px bg-white"></div>
          </div>

          {/* Heading */}
          <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-2 sm:mb-3 leading-tight">
            ABOUT US
          </h2>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl font-lato leading-relaxed px-4 md:px-8">
            <p>
              Misqabbi is a women-owned fashion brand crafting made-to-measure and bespoke pieces
              that honor real bodies and real stories. Every garment is designed with you in mind,
              tailored to fit, flatter, and empower.
            </p>

            <p>
              We believe clothing should celebrate your shape, reflect your spirit, and help you
              feel like the main character in your life.
            </p>

            <p>
              We&rsquo;re also building a community where women support and uplift each other.
              Through shared stories, intentional design, and collective care, we create space for
              women to feel seen, celebrated, and connected.
            </p>
          </div>

          {/* Tagline */}
          <div className="mt-10 md:mt-16">
            <p className="text-lg md:text-2xl lg:text-3xl font-lato font-medium">
              Made with{' '}
              <span className="relative inline-block">
                love
                {/* Decorative underline for "love" */}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-white -mb-1"></span>
              </span>
              , made for you.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Image Container  */}
      <div className="w-full grid grid-cols-1">
        <div className="w-full h-[150px] md:h-[200px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761957946/CSI_9947_c7b1fa.jpg"
            alt="Misqabbi fashion"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
