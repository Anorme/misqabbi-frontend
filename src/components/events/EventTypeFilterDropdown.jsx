import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Triangle, Wallet } from 'lucide-react';

import { EVENT_TYPE_LABELS, EVENT_TYPES } from '../../constants/events';

const MotionDiv = motion.div;

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  ...EVENT_TYPES.map(value => ({ value, label: EVENT_TYPE_LABELS[value] })),
];

/**
 * Pill-styled event type filter dropdown (Free / Paid / All types).
 *
 * @param {Object} props
 * @param {string} props.value - '' | 'free' | 'paid'
 * @param {(next: string) => void} props.onChange
 * @param {string} [props.className]
 */
const EventTypeFilterDropdown = ({ value = '', onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const selectedOption = TYPE_OPTIONS.find(option => option.value === value) || TYPE_OPTIONS[0];
  const hasActiveFilter = Boolean(value);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleSelect = nextValue => {
    onChange?.(nextValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(open => !open)}
        onKeyDown={handleKeyDown}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-sm ring-1 transition ${
          hasActiveFilter || isOpen
            ? 'bg-msq-purple-rich text-white ring-msq-purple-rich'
            : 'bg-gray-50 text-gray-700 ring-gray-100 hover:bg-white hover:ring-gray-200'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Filter events by type, currently ${selectedOption.label}`}
      >
        <Wallet className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{selectedOption.label}</span>
        <Triangle
          className={`fill-current stroke-none transition-transform duration-200 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
          size={10}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            className="absolute left-0 z-40 mt-1 min-w-full rounded-md bg-white py-1 shadow-xl shadow-black/10 ring-1 ring-gray-100"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            role="listbox"
            aria-label="Event type options"
          >
            {TYPE_OPTIONS.map(option => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value || 'all'}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full cursor-pointer whitespace-nowrap px-4 py-2 text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'bg-msq-gold-light/20 font-medium text-msq-purple-deep'
                      : 'text-msq-purple-deep hover:bg-msq-gold-light/10 hover:text-msq-purple-rich'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventTypeFilterDropdown;
