import { X } from 'lucide-react';

const CloseButton = ({ onClose, size = 20, className = '', ariaLabel = 'Close' }) => {
  return (
    <button
      onClick={onClose}
      className={`p-2 transition-colors duration-200 ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <X
        size={size}
        className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors duration-200"
      />
    </button>
  );
};

export default CloseButton;
