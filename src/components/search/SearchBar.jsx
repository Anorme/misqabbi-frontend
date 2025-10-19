import { Search } from 'lucide-react';
import CloseButton from '../ui/CloseButton';

const SearchBar = ({
  className = '',
  placeholder = 'Search',
  showIcon = true,
  variant = 'desktop',
  onClose,
  isSearchOpen = false,
  onKeyDown,
  ...props
}) => {
  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
          onKeyDown={onKeyDown}
          {...props}
        />
        {showIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearchOpen ? (
              <CloseButton onClose={onClose} size={18} className="p-1" ariaLabel="Close search" />
            ) : (
              <Search size={18} className="text-msq-gold-light" />
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
        onKeyDown={onKeyDown}
        {...props}
      />
      {showIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search size={18} className="text-msq-gold-light" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
