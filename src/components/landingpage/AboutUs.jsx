import { Heart, Sparkles, Users, Scissors } from 'lucide-react';
import SEO from '../SEO';

const AboutUs = () => {
  return (
    <main className="w-full font-lato">
      <SEO
        title="About Us"
        description="Learn about Misqabbi, a women-owned fashion brand crafting made-to-measure and bespoke pieces that honor real bodies and real stories."
        canonicalPath="/about"
      />

      {/* Hero Image Section */}
      <section className="w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden relative">
        <img
          src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761957956/CSI_0054_ffcm2z.jpg"
          alt="Misqabbi fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8 md:pb-12">
          <div className="text-center px-4">
            <h1 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 md:mb-4">
              About Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
              Crafting made-to-measure fashion that celebrates your unique story
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section - Split Layout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
              <p className="text-sm sm:text-base lg:text-lg">
                Misqabbi is a women-owned fashion brand crafting made-to-measure and bespoke pieces
                that honor real bodies and real stories. Every garment is designed with you in mind,
                tailored to fit, flatter, and empower.
              </p>
              <p className="text-sm sm:text-base lg:text-lg">
                We believe clothing should celebrate your shape, reflect your spirit, and help you
                feel like the main character in your life.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1762231487/CSI_0014_cvmuyd.jpg"
                alt="Misqabbi fashion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="w-full bg-gradient-to-br from-msq-purple-light/5 to-msq-purple-rich/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-msq-purple-rich text-center mb-8 md:mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Value 1: Made-to-Measure */}
            <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-gray-100 hover:border-msq-purple-light transition-all hover:shadow-lg">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-4 bg-msq-purple-rich/10 rounded-full mb-4">
                  <Scissors className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Made-to-Measure Excellence
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                Every piece is crafted specially for you, ensuring a perfect fit that celebrates
                your style.
              </p>
            </div>

            {/* Value 2: Empowerment */}
            <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-gray-100 hover:border-msq-purple-light transition-all hover:shadow-lg">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-4 bg-msq-purple-rich/10 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Empowerment Through Fashion
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                We believe clothing should help you feel like the main character you are.
              </p>
            </div>

            {/* Value 3: Community */}
            <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-gray-100 hover:border-msq-purple-light transition-all hover:shadow-lg">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-4 bg-msq-purple-rich/10 rounded-full mb-4">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-msq-purple-rich" />
                </div>
                <h3 className="text-lg md:text-xl font-bebas text-msq-purple-rich mb-3">
                  Building Community
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                We create space for women to feel seen, celebrated, and connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - Reverse Split Layout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761957946/CSI_9947_c7b1fa.jpg"
              alt="Misqabbi community"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-msq-purple-rich mb-4 md:mb-6">
              Building Community Together
            </h2>
            <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
              <p className="text-sm sm:text-base lg:text-lg">
                We&rsquo;re building a community where women support and uplift each other. Through
                shared stories, intentional design, and collective care, we create space for women
                to feel seen, celebrated, and connected.
              </p>
              <p className="text-sm sm:text-base lg:text-lg">
                Every piece we create is crafted with intention, care, and precision. We honor real
                bodies and real stories, ensuring that every garment is designed to fit, flatter,
                and empower you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full">
        <div className="relative w-full h-[250px] md:h-[300px] lg:h-[250px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_1200,c_limit/v1761957956/CSI_0054_ffcm2z.jpg"
            alt="Misqabbi fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white mb-4 md:mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/95 mb-6 md:mb-8 max-w-2xl mx-auto">
                Discover our collection and experience fashion designed specifically for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop"
                  className="text-sm sm:text-base bg-white text-msq-purple-rich px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Browse Collection
                </a>
                <a
                  href="/contact-us"
                  className="text-sm sm:text-base bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
