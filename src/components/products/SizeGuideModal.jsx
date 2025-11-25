import { useEffect } from 'react';
import CloseButton from '../ui/CloseButton';
import sizeChart from '../../assets/size chart (inches).jpg';

const SizeGuideModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl p-2 relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bebas text-msq-purple-rich">Size Guide (Inches)</h3>
          <CloseButton onClose={onClose} size={20} className="p-2" ariaLabel="Close size guide" />
        </div>

        <div className="relative flex rounded-lg overflow-hidden bg-gray-50">
          <img
            src={sizeChart}
            alt="Size Chart"
            className="block max-w-[90vh] max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
