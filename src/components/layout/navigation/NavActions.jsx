import { Search } from 'lucide-react';
import FavoritesButton from '../../favorites/FavoritesButton.jsx';
import CartButton from '../../cart/CartButton.jsx';
import ProfileDropdown from './ProfileDropdown.jsx';

const NavActions = ({
  variant = 'desktop',
  className = '',
  inlineSearch,
  isSearchOpen = false,
  onSearchToggle,
  iconClassName = 'text-msq-gold hover:text-msq-gold-deep',
  showProfile = false,
}) => {
  if (variant === 'mobile') {
    return (
      <div className={`flex flex-shrink items-center justify-end gap-0 min-w-0 ${className}`}>
        <button
          onClick={onSearchToggle}
          className={`p-1.5 sm:p-2 cursor-pointer transition-colors duration-200 ${iconClassName}`}
          aria-label="Toggle search"
          aria-expanded={isSearchOpen}
        >
          <Search size={18} />
        </button>
        <FavoritesButton size={18} showCount={true} className={`p-1.5 sm:p-2 ${iconClassName}`} />
        <CartButton size={18} showCount={true} className={`p-1.5 sm:p-2 ${iconClassName}`} />
        {showProfile && <ProfileDropdown className={iconClassName} />}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`flex flex-shrink items-center justify-end gap-2 ${className}`}>
      <button
        onClick={onSearchToggle}
        className={`p-2 cursor-pointer transition-colors duration-200 ${iconClassName}`}
        aria-label="Toggle search"
        aria-expanded={isSearchOpen}
      >
        <Search size={20} />
      </button>
      {inlineSearch && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'w-44 opacity-100 lg:w-56' : 'w-0 opacity-0 pointer-events-none'
          }`}
        >
          {isSearchOpen && <div className="min-w-44 lg:min-w-56">{inlineSearch}</div>}
        </div>
      )}
      <FavoritesButton size={20} showCount={true} className={iconClassName} />
      <CartButton size={20} showCount={true} className={iconClassName} />
      <div className="">
        <ProfileDropdown className={iconClassName} />
      </div>
    </div>
  );
};

export default NavActions;
