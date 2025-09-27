import { Search, X } from 'lucide-react';
import FavoritesButton from './FavoritesButton.jsx';
import CartButton from './CartButton.jsx';
import AuthButtons from './AuthButtons.jsx';
import MenuButton from './MenuButton.jsx';

const NavActions = ({
  variant = 'desktop',
  className = '',
  onMenuClick,
  isSearchOpen = false,
  onSearchToggle,
}) => {
  if (variant === 'mobile') {
    return (
      <div className={`flex gap-4 items-center justify-end ${className}`}>
        <FavoritesButton size={20} showCount={true} />
        <CartButton size={20} showCount={true} />
        <button
          onClick={onSearchToggle}
          className="p-2 text-msq-gold-light cursor-pointer hover:text-msq-gold transition-colors duration-200"
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </button>
        <MenuButton size={20} onClick={onMenuClick} />
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <FavoritesButton size={20} showCount={true} />
      <CartButton size={20} showCount={true} />
      <div className="">
        <AuthButtons variant="desktop" />
      </div>
    </div>
  );
};

export default NavActions;
