import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import CloseButton from '../ui/CloseButton';
import { useCatalogState, useCatalogDispatch } from '../../contexts/catalog/useCatalog';
import {
  closeFilterModal,
  setPriceFilter,
  clearPriceFilter,
} from '../../contexts/catalog/catalogActions';
import PriceRangeSlider from '../ui/PriceRangeSlider';

const PriceFilterModal = () => {
  const { isFilterModalOpen, priceFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const [localMinPrice, setLocalMinPrice] = useState(parseInt(priceFilter.minPrice) || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(parseInt(priceFilter.maxPrice) || 5000);

  // Update local state when priceFilter changes
  useEffect(() => {
    setLocalMinPrice(parseInt(priceFilter.minPrice) || 0);
    setLocalMaxPrice(parseInt(priceFilter.maxPrice) || 5000);
  }, [priceFilter]);

  const handleApply = () => {
    catalogDispatch(
      setPriceFilter({
        minPrice: localMinPrice.toString(),
        maxPrice: localMaxPrice.toString(),
      })
    );
    catalogDispatch(closeFilterModal());
  };

  const handleClear = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(5000);
    catalogDispatch(clearPriceFilter());
    catalogDispatch(closeFilterModal());
  };

  const handleSliderChange = ({ minValue, maxValue }) => {
    setLocalMinPrice(minValue);
    setLocalMaxPrice(maxValue);
  };

  const handleClose = () => {
    catalogDispatch(closeFilterModal());
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isFilterModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-transparent"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-filter-title"
    >
      <div
        className="bg-white rounded-t-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out"
        style={{ height: '25vh', minHeight: '300px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            <ChevronUp className="text-msq-purple-deep mr-2" size={20} />
            <h2
              id="price-filter-title"
              className="text-lg font-semibold text-msq-purple-deep uppercase"
            >
              Price
            </h2>
          </div>
          <CloseButton
            onClose={handleClose}
            size={20}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            ariaLabel="Close price filter modal"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Range Slider */}
          <div className="space-y-4">
            <PriceRangeSlider
              min={0}
              max={5000}
              minValue={localMinPrice}
              maxValue={localMaxPrice}
              onChange={handleSliderChange}
              className="w-full"
            />
          </div>

          {/* Price Input Fields */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  GHC
                </span>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={localMinPrice}
                  onChange={e => setLocalMinPrice(parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-msq-gold-light focus:border-transparent text-sm"
                />
              </div>
            </div>

            <span className="text-gray-400 text-sm">to</span>

            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  GHC
                </span>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={localMaxPrice}
                  onChange={e => setLocalMaxPrice(parseInt(e.target.value) || 5000)}
                  className="w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-msq-gold-light focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-msq-purple-deep rounded-md hover:bg-msq-purple-rich focus:outline-none focus:ring-2 focus:ring-msq-gold-light transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterModal;
