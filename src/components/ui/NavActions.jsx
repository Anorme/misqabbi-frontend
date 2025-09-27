import FavoritesButton from './FavoritesButton.jsx';
import CartButton from './CartButton.jsx';
import AuthButtons from './AuthButtons.jsx';
import MenuButton from './MenuButton.jsx';

const NavActions = ({ variant = 'desktop', className = '', onMenuClick }) => {
  if (variant === 'mobile') {
    return (
      <div className={`flex gap-4 items-center justify-end ${className}`}>
        <FavoritesButton size={20} showCount={true} />
        <CartButton size={20} showCount={true} />
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
