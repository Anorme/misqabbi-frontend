import { Search, X } from 'lucide-react';

import { sanitizeSearchQuery } from '../../utils/sanitization';

import CloseButton from '../ui/CloseButton';

const SearchBar = ({
  className = '',
  placeholder = 'Search',
  showIcon = true,
  variant = 'desktop',
  onClose,
  isSearchOpen = false,
  onKeyDown,
  onClear,
  value = '',
  onChange,
  ...props
}) => {
  // Handle close button - clear query and close search
  const handleClose = () => {
    // Clear query if it exists
    if (value && onClear) {
      onClear();
    }
    // Close search bar
    if (onClose) {
      onClose();
    }
  };

  // Sanitize search query on blur
  const handleBlur = e => {
    const sanitizedValue = sanitizeSearchQuery(e.target.value);
    if (sanitizedValue !== e.target.value && onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: sanitizedValue,
        },
      };
      onChange(syntheticEvent);
    }
    // Call original onBlur if provided
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={handleBlur}
          {...props}
        />
        {showIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearchOpen ? (
              <CloseButton
                onClose={handleClose}
                size={18}
                className="p-1"
                ariaLabel="Close search"
              />
            ) : value && onClear ? (
              <button type="button" onClick={onClear} className="p-1" aria-label="Clear search">
                <X size={18} className="text-msq-gold-light" />
              </button>
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
        value={value}
        className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={handleBlur}
        {...props}
      />
      {showIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearchOpen && onClose ? (
            <CloseButton onClose={handleClose} size={18} className="p-1" ariaLabel="Close search" />
          ) : value && onClear ? (
            <button type="button" onClick={onClear} className="p-1" aria-label="Clear search">
              <X
                size={18}
                className="hover:text-red-600 text-msq-gold-light transition-colors duration-200 cursor-pointer"
              />
            </button>
          ) : (
            <Search size={18} className="text-msq-gold-light" />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
