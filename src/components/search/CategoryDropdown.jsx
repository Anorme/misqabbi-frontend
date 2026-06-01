import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { CATEGORIES, getCategoryLabel } from '../../constants/categories';

const MotionDiv = motion.div;

const CategoryDropdown = ({ selectedCategory = '', variant = 'desktop', className = '' }) => {
  const navigate = useNavigate();
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

  const handleCategoryClick = categoryValue => {
    // If category value is empty ("All"), navigate to /shop
    if (!categoryValue || categoryValue === '') {
      navigate('/shop');
    } else {
      // Navigate to category route using category value directly
      navigate(`/category/${categoryValue}`);
    }
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const displayText = selectedCategory ? getCategoryLabel(selectedCategory) : 'ALL CATEGORIES';

  const baseButtonClasses =
    'flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium transition-colors duration-200 cursor-pointer';
  const baseDropdownClasses = 'z-40 bg-white shadow-xl shadow-black/10 rounded-md py-1';

  const dropdownClasses = `${baseDropdownClasses} absolute left-0 mt-1 min-w-full`; // Button width for both desktop and mobile

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`${baseButtonClasses} ${
          variant === 'mobile' ? 'px-2 text-xs whitespace-nowrap' : 'px-4'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Category dropdown, currently: ${displayText}`}
      >
        {displayText}
        <Triangle
          className={`ml-1 fill-msq-gold-light rotate-180 stroke-none transition-transform duration-200 ${
            isOpen ? 'rotate-0' : ''
          }`}
          size={10}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            className={dropdownClasses}
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          >
            {CATEGORIES.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                  selectedCategory === category.value ||
                  (!selectedCategory && category.value === '')
                    ? 'bg-msq-gold-light/20 text-msq-purple-deep font-medium'
                    : 'text-msq-purple-deep hover:bg-msq-gold-light/10 hover:text-msq-purple-rich'
                }`}
                role="menuitem"
              >
                {category.label}
              </button>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropdown;
