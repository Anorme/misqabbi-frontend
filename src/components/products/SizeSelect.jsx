import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import CustomSizeInput from './CustomSizeInput';
import SizeGuideModal from './SizeGuideModal';

function SizeSelect({
  selected,
  onChange,
  category,
  customMeasurements,
  onCustomMeasurementsChange,
  isCustomSizeEnabled = false,
  onToggleCustomSize,
  supportsCustomSizing = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  function handleSizeSelect(size) {
    if (onChange) onChange(size);
    if (onToggleCustomSize) onToggleCustomSize(false);
  }

  function handleCustomSizeToggle(enabled) {
    if (onToggleCustomSize) onToggleCustomSize(enabled);
  }

  function handleSizeGuideClick(event) {
    event.stopPropagation();
    setIsSizeGuideOpen(true);
  }

  return (
    <div className="flex flex-col gap-0">
      <div className="relative flex w-full items-center justify-between gap-4 py-1 text-left text-gray-900">
        <button
          type="button"
          onClick={() => setIsOpen(current => !current)}
          className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msq-purple-rich"
          aria-expanded={isOpen}
          aria-label="Toggle size selector"
        />

        <span className="relative z-10 flex items-baseline gap-2 pointer-events-none">
          <span className="text-base sm:text-lg lg:text-xl">Size</span>
          <button
            type="button"
            onClick={handleSizeGuideClick}
            className="pointer-events-auto text-xs sm:text-sm text-gray-900"
          >
            <span className="mr-1">(</span>
            <span className="underline cursor-pointer hover:text-msq-purple-rich transition-colors duration-200">
              View Size Guide
            </span>
            <span className="ml-1">)</span>
          </button>
        </span>

        <Motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`pointer-events-none flex shrink-0 items-center justify-center [&_path:last-child]:origin-center [&_path:last-child]:transition-transform [&_path:last-child]:duration-200 ${
            isOpen ? '[&_path:last-child]:scale-y-0' : ''
          }`}
          aria-hidden="true"
        >
          <Plus size={20} strokeWidth={1.8} />
        </Motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-3 pb-2 pt-3 sm:px-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">
                  Standard Size <span className="text-xs sm:text-sm font-normal">(UK)</span>
                </h3>

                <ul className="flex flex-wrap justify-start gap-2">
                  {sizes.map(size => (
                    <li key={size}>
                      <button
                        type="button"
                        onClick={() => handleSizeSelect(size)}
                        className={`cursor-pointer border px-3 sm:px-4 py-1 transition text-sm sm:text-base
                          ${
                            !isCustomSizeEnabled && selected === size
                              ? 'bg-msq-gold-light text-white border-msq-gold-light'
                              : 'bg-gray-100 border-0 hover:bg-gray-200 text-gray-900'
                          }`}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {supportsCustomSizing && (
                <CustomSizeInput
                  category={category}
                  measurements={customMeasurements}
                  onMeasurementsChange={onCustomMeasurementsChange}
                  onToggleCustomSize={handleCustomSizeToggle}
                  isCustomSizeEnabled={isCustomSizeEnabled}
                  compact
                />
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}

export default SizeSelect;
