import { ShoppingCart, Heart, Menu } from 'lucide-react';
import { Link } from 'react-router';
import SearchBar from './SearchBar.jsx';

function NavMobile() {
  return (
    <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      {/* Top Row: Logo and Icons */}
      <div className="flex justify-between items-center pt-6">
        {/* Left Section: Logo */}
        <div className="flex gap-4 items-center">
          <Link to="/">
            <div className="flex-shrink-0 h-14">
              <img
                src="/images/Logo.png"
                alt="Misqabbi Logo"
                className="w-36 sm:w-40 md:w-56 object-contain h-full cursor-pointer"
              />
            </div>
          </Link>
        </div>

        {/* Right Section: Icons */}
        <div className="flex gap-4 items-center justify-end">
          <Heart size={20} className="text-msq-gold-light cursor-pointer" />
          <ShoppingCart size={20} className="text-msq-gold-light cursor-pointer" />
          <Menu size={20} className="text-msq-gold-light cursor-pointer" />
        </div>
      </div>

      {/* Bottom Row: Search Bar */}
      <div className="">
        <SearchBar className="pt-4" />
      </div>
    </div>
  );
}

export default NavMobile;
