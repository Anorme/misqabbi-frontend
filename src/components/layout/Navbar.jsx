import { Link } from 'react-router';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuthState } from '../../contexts/auth/useAuth.js';
import { useCartState } from '../../contexts/cart/useCart';
import { getCartItemCount } from '../../contexts/cart/cartSelectors';
import LoginButton from '../auth/LoginButton.jsx';
import LogoutButton from '../auth/LogoutButton.jsx';
import CartDrawer from '../CartDrawer.jsx';

const NavBar = () => {
  const { isAuthenticated } = useAuthState();
  const cartState = useCartState();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = getCartItemCount(cartState);

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
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-msq-gold-light cursor-pointer relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-msq-gold text-white text-[10px] font-lato px-1.5 py-0.5 rounded-full shadow-md">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="text-[#d265ff] hover:text-msq-purple-rich font-medium cursor-pointer">
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default NavBar;
