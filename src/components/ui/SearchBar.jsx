import { Search } from 'lucide-react';

const SearchBar = ({ className = '', placeholder = 'Search', showIcon = true, ...props }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-msq-gold-light text-msq-gold-light rounded-full focus:outline-none focus:ring-2 focus:ring-msq-gold focus:border-transparent"
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
