import { useState } from 'react';
import { Link } from 'react-router';
import { SOCIALS_MAP } from '../../constants/socials';
import { subscribeToNewsletter } from '../../api/newsletter';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async e => {
    e.preventDefault();

    if (!email.trim()) {
      showErrorToast('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await subscribeToNewsletter(email);
      showSuccessToast('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      showErrorToast(error.message || 'Failed to subscribe to newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-msq-purple relative left-0 right-0 bottom-0">
      <footer className="max-w-7xl mx-auto  px-6 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 justify-between gap-12">
          {/* Customer Care */}
          <div className="space-y-4 min-w-[150px] px-4 text-start lg:order-1">
            <h3 className="text-white font-semibold whitespace-nowrap text-lg mb-4">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faqs" className="text-white/90 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4 min-w-[150px]  text-start lg:order-2">
            <h3 className="text-white font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-3 ">
              <li>
                <a
                  href={SOCIALS_MAP.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS_MAP.Tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  Tiktok
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS_MAP.WhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS_MAP.Email}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/*  Subscribe Section */}

          <div className="col-span-2 flex flex-col items-start lg:order-3 lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Subscribe</h3>
            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex relative w-full mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 h-15 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="px-4 py-3 h-15 absolute right-0 border border-white/20 border-l-0 rounded-r-md hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
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
                  )}
                </button>
              </div>
            </form>
            <p className="text-white/80 text-sm w-full text-start leading-relaxed w-">
              Be the first to know about new collections, special events and much more
            </p>
            <div className="flex  items-center justify-between h-full ">
              {/* Logo */}
              <img
                src="/images/Logo.png"
                alt="Misqabbi Logo"
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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
