import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { PiTelegramLogoLight } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="bg-[#b3a7d8] w-[98vw] m-[10px] mt-16 px-6 sm:px-12 md:px-20 py-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        {/* Logo + Text */}
        <div className="flex flex-col max-w-sm">
          <img
            src="/images/Logo.png"
            alt="logo here"
            className="w-40 sm:w-56 md:w-72"
          />
          <p className="text-sm sm:text-base mt-3">
            Discover beautifully women's clothing, <br />
            thoughtfully styled for both special occasions and <br />
            everyday elegance
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex gap-12 sm:gap-20">
          <p className="text-sm sm:text-base">
            <span className="text-gray-600 font-semibold">Made for</span> <br />
            Women clothes <br />
            Classy <br />
            Casual
          </p>
          <p className="text-sm sm:text-base">
            <span className="text-gray-600 font-semibold">Collections</span>{" "}
            <br />
            Wedding dress <br />
            Events and occasions <br />
            Group match <br />
            Summer <br />
            Handwoven
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-sm sm:text-base">
            <span className="text-gray-600 font-semibold">Quick links</span>{" "}
            <br />
            Home <br />
            Shop All <br />
            About Us
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 mt-10 pt-6 gap-6 md:gap-0">
        {/* Social Icons */}
        <div className="flex text-xl sm:text-2xl text-gray-600 gap-4 sm:gap-6">
          <FaWhatsapp />
          <IoLogoInstagram />
          <RiTwitterXFill />
          <PiTelegramLogoLight />
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
          <p>About Us</p>
          <p>Terms of Service</p>
          <p>Privacy Policies</p>
          <p>Cookies</p>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-700 text-center">
          ©️2025 Misqabbi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
