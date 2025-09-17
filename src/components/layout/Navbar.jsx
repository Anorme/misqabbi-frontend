import { Link } from 'react-router';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useAuthState } from '../../contexts/auth/useAuth.js';
import LoginButton from '../auth/LoginButton.jsx';
import LogoutButton from '../auth/LogoutButton.jsx';

const NavBar = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <header className="mt-8 ">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex-shrink-0">
              <img
                src="/images/Logo.png"
                alt="Misqabbi Logo"
                className="w-28 sm:w-40 md:w-56 object-contain cursor-pointer"
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="text-msq-gold-light" />
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center lg:space-x-4 space-x-2">
            <div className="p-2 md:hidden text-msq-gold-light">
              <Search size={20} className="text-msq-gold-light" />
            </div>
            <button className="p-2 text-msq-gold-light">
              <Heart className="hover:fill-msq-gold-light cursor-pointer" size={20} />
            </button>
            <Link to="/cart">
              <button className="p-2 text-msq-gold-light cursor-pointer">
                <ShoppingCart size={20} />
              </button>
            </Link>
            <button className="text-[#d265ff] hover:text-msq-purple-rich hidden lg:block font-medium cursor-pointer">
              Help
            </button>
            <div className="hidden lg:block">
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
            <Link to="/register" className="hidden lg:block">
              <button className="bg-msq-purple-rich text-white px-4 py-2 rounded-md hover:bg-msq-purple font-medium cursor-pointer">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
