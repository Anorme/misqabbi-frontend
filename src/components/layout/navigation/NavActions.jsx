import { Search } from 'lucide-react';
import FavoritesButton from '../../favorites/FavoritesButton.jsx';
import CartButton from '../../cart/CartButton.jsx';
import ProfileDropdown from './ProfileDropdown.jsx';

const NavActions = ({
  variant = 'desktop',
  className = '',
  onSearchToggle,
  iconClassName = 'text-msq-gold hover:text-msq-gold-deep',
}) => {
  if (variant === 'mobile') {
    return (
      <div className={`flex flex-shrink items-center justify-end gap-0 min-w-0 ${className}`}>
        <CartButton size={18} showCount={true} className={`p-1.5 sm:p-2 ${iconClassName}`} />
        <FavoritesButton size={18} showCount={true} className={`p-1.5 sm:p-2 ${iconClassName}`} />
        <button
          onClick={onSearchToggle}
          className={`p-1.5 sm:p-2 cursor-pointer transition-colors duration-200 ${iconClassName}`}
          aria-label="Toggle search"
        >
          <Search size={18} />
        </button>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`flex flex-shrink items-center space-x-2 ${className}`}>
      <button
        onClick={onSearchToggle}
        className={`p-2 cursor-pointer transition-colors duration-200 ${iconClassName}`}
        aria-label="Toggle search"
      >
        <Search size={20} />
      </button>
      <FavoritesButton size={20} showCount={true} className={iconClassName} />
      <CartButton size={20} showCount={true} className={iconClassName} />
      <div className="">
        <ProfileDropdown className={iconClassName} />
      </div>
    </div>
  );
};

export default NavActions;
