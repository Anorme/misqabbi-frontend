import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { SORT_OPTIONS, getSortLabel } from '../../constants/sortOptions';

const MotionDiv = motion.div;

const SortDropdown = ({
  selectedSort = 'latest',
  onSortSelect,
  variant = 'desktop',
  className = '',
}) => {
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

  const handleSortClick = sortOption => {
    onSortSelect(sortOption);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const displayText = getSortLabel(selectedSort);

  const baseButtonClasses =
    'flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium transition-colors duration-200 cursor-pointer';
  const baseDropdownClasses = 'z-40 bg-white shadow-xl shadow-black/10 rounded-md py-1';

  const dropdownClasses = `${baseDropdownClasses} absolute right-0 mt-1 grid min-w-max max-w-[calc(100vw-2rem)]`;

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
        aria-label={`Sort dropdown, currently: ${displayText}`}
      >
        SORT BY
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
            {SORT_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => handleSortClick(option.value)}
                className={`w-full whitespace-nowrap text-left px-6 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                  selectedSort === option.value
                    ? 'bg-msq-gold-light/20 text-msq-purple-deep font-medium'
                    : 'text-msq-purple-deep hover:bg-msq-gold-light/10 hover:text-msq-purple-rich'
                }`}
                role="menuitem"
              >
                {option.label?.toUpperCase()}
              </button>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
