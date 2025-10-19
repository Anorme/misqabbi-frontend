import { useState } from 'react';
import CloseButton from '../ui/CloseButton';

const SizeSelectorModal = ({ currentSize, onSizeChange, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(currentSize);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleSizeSelect = size => {
    setSelectedSize(size);
  };

  const handleConfirm = () => {
    if (selectedSize !== currentSize) {
      onSizeChange(selectedSize);
    }
    onClose();
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-xs w-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bebas text-msq-purple-rich">Select Size</h3>
          <CloseButton
            onClose={onClose}
            size={16}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            ariaLabel="Close size selector"
          />
        </div>

        {/* Size Options */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors duration-200 ${
                  selectedSize === size
                    ? 'bg-msq-purple-rich text-white border-msq-purple-rich'
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Current Selection */}
        <div className="mb-3 p-2 bg-gray-50 rounded-md">
          <p className="text-xs font-lato text-gray-600">
            Current: <span className="font-semibold">{currentSize}</span>
          </p>
          {selectedSize !== currentSize && (
            <p className="text-xs font-lato text-msq-purple-rich">
              New: <span className="font-semibold">{selectedSize}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-3 py-2 text-sm bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectorModal;
