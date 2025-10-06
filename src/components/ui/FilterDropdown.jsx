import { useState, useRef, useEffect } from 'react';
import { Triangle } from 'lucide-react';
import { useCatalogState, useCatalogDispatch } from '../../contexts/catalog/useCatalog';
import { openFilterModal } from '../../contexts/catalog/catalogActions';

const FilterDropdown = ({ variant = 'desktop', className = '' }) => {
  const { priceFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleFilterClick = () => {
    catalogDispatch(openFilterModal());
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const hasActiveFilters = priceFilter.minPrice || priceFilter.maxPrice;

  const baseButtonClasses =
    'flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium transition-colors duration-200 cursor-pointer';
  const baseDropdownClasses = 'z-40 bg-white border border-[#949396] shadow-lg rounded-md py-1';

  const dropdownClasses = `${baseDropdownClasses} absolute left-0 mt-1 min-w-full`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`${baseButtonClasses} ${
          variant === 'mobile' ? 'px-2 text-xs whitespace-nowrap' : 'px-4'
        } ${hasActiveFilters ? 'text-msq-purple-rich' : ''}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Filter dropdown${hasActiveFilters ? ', filters active' : ''}`}
      >
        FILTER
        {hasActiveFilters && (
          <span
            className="ml-1 w-2 h-2 bg-msq-gold-light rounded-full"
            aria-label="Active filters"
          />
        )}
        <Triangle
          className={`ml-1 fill-msq-gold-light rotate-180 stroke-none transition-transform duration-200 ${
            isOpen ? 'rotate-0' : ''
          }`}
          size={10}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={dropdownClasses}>
          <button
            onClick={handleFilterClick}
            className="w-full text-left px-4 py-2 text-sm transition-colors duration-200 cursor-pointer text-msq-purple-deep hover:bg-msq-gold-light/10 hover:text-msq-purple-rich"
            role="menuitem"
          >
            Price
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
