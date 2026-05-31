import { Menu } from 'lucide-react';

const MenuButton = ({
  className = '',
  iconClassName = 'text-msq-gold hover:text-msq-gold-deep',
  size = 18,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 sm:p-2 cursor-pointer transition-colors duration-200 ${iconClassName} ${className}`}
      {...props}
    >
      <Menu size={size} />
    </button>
  );
};

export default MenuButton;
