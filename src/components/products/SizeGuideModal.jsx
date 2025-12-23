import { useEffect } from 'react';
import CloseButton from '../ui/CloseButton';
import sizeChart from '../../assets/sizechart.png';

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

        <div className="relative flex flex-col md:flex-row gap-4 rounded-lg overflow-hidden bg-gray-50 p-4 items-stretch">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={sizeChart}
              alt="Size Chart"
              className="block max-w-[90vh] max-h-[80vh] object-contain"
            />
          </div>

          <div className="flex-1 md:max-w-xs md:border-l md:border-gray-200 md:pl-4 text-xs sm:text-sm text-gray-700 space-y-3 flex flex-col justify-center">
            <h4 className="font-semibold text-msq-purple-rich text-sm sm:text-base">
              A gentle note from Misqabbi
            </h4>
            <p>
              Every garment is crafted with care to fit you beautifully. Please provide accurate
              measurements for the best fit.
            </p>
            <p className="font-semibold text-gray-800">Custom Orders</p>
            <p>
              Provide exact body measurements when placing your order. Inaccurate measurements may
              affect fit.
            </p>
            <p className="font-semibold text-gray-800">Standard Sizes</p>
            <p>If unsure of your measurements, select from our standard size chart shown here.</p>
            <p className="font-semibold text-gray-800">Responsibility</p>
            <p>
              Misqabbi cannot be held responsible for fit issues from incorrect measurements.
              Adjustments due to inaccurate measurements will be at the client&apos;s expense.
            </p>
            <p>
              We encourage you to double-check your measurements or consult a professional tailor.
              This helps us deliver the perfect fit you deserve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
