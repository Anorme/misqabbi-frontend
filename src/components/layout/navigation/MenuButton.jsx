import { Menu } from 'lucide-react';

const MenuButton = ({ className = '', size = 20, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-msq-gold-light cursor-pointer hover:text-msq-gold transition-colors duration-200 ${className}`}
      {...props}
    >
      <Menu size={size} />
    </button>
  );
};

export default MenuButton;
