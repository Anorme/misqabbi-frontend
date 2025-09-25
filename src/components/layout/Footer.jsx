const Footer = () => {
  return (
    <div className="w-screen bg-msq-purple relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <footer className="max-w-7xl mx-auto  px-6 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-6 justify-between gap-12">
          {/*  Subscribe Section */}

          <div className="col-span-2 flex flex-col items-start lg:order-5">
            <h3 className="text-white font-semibold text-lg mb-4">Subscribe</h3>
            <div className="flex relative  w-full mb-4 ">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 h-15 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
              />
              <button className="px-4 py-3 h-15 absolute right-0 border border-white/20 border-l-0 rounded-r-md hover:bg-white/30 transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <p className="text-white/80 text-sm w-3/4 text-start leading-relaxed">
              Be the first to know about new collections, special events and much more
            </p>
          </div>

          {/* Customer Care */}
          <div className="space-y-4 min-w-[150px] px-4 text-start lg:order-1">
            <h3 className="text-white font-semibold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4 min-w-[150px]  text-start lg:order-2">
            <h3 className="text-white font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-3 ">
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Tiktok
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4 min-w-[150px] lg:order-3  px-4 text-start col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Privacy Setting
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="flex justify-between col-span-2 lg:order-last lg:col-start-5 ">
            {/* Logo */}
            <img
              src="/images/Logo.png"
              alt="Misqobbi Logo"
              className="w-28 sm:w-40 md:w-56 object-contain"
            />

            {/* Payment Methods */}
            <div className="flex items-center space-x-3 pt-2">
              <div className="bg-white rounded px-2 py-1">
                <span className="text-blue-600 font-bold text-xs">VISA</span>
              </div>
              <div className="bg-yellow-400 rounded px-2 py-1">
                <span className="text-black font-bold text-xs">MTN</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
