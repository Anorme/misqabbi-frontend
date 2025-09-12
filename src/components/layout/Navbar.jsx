import { ShoppingCart, Heart, Search } from 'lucide-react';

const NavBar = () => {
  return (
    <header className="mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/Logo.png"
              alt="Misqobbi Logo"
              className="w-28 sm:w-40 md:w-56 object-contain"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
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
          <div className="flex items-center space-x-4">
            <button className="p-2 text-msq-gold-light">
              <Heart className="hover:fill-msq-gold-light cursor-pointer" size={20} />
            </button>
            <button className="p-2 text-msq-gold-light cursor-pointer">
              <ShoppingCart size={20} />
            </button>
            <button className="text-[#d265ff] hover:text-msq-purple-rich font-medium cursor-pointer">
              Help
            </button>
            <button className="text-[#d265ff] hover:text-msq-purple-rich font-medium cursor-pointer">
              Login
            </button>
            <button className="bg-msq-purple-rich text-white px-4 py-2 rounded-md hover:bg-msq-purple font-medium cursor-pointer">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
