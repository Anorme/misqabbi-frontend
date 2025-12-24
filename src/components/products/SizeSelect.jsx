import { useState } from 'react';
import SizeGuideModal from './SizeGuideModal';

function SizeSelect({ selected, onChange }) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  function handleSizeSelect(size) {
    if (onChange) onChange(size);
  }

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="text-base sm:text-lg lg:text-xl text-gray-900">Size</h2>
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="text-xs sm:text-sm text-gray-900"
        >
          <span className="mr-1">(</span>
          <span className="underline cursor-pointer hover:text-msq-purple-rich transition-colors duration-200">
            View Size Guide
          </span>
          <span className="ml-1">)</span>
        </button>
      </div>

      <ul className="flex gap-2 justify-around flex-wrap">
        {sizes.map(size => (
          <li
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`cursor-pointer border px-3 sm:px-4 py-1 rounded-md transition text-sm sm:text-base
              ${
                selected === size
                  ? 'bg-msq-gold-light text-white border-msq-gold-light'
                  : 'bg-gray-100 border-0 hover:bg-gray-200 text-gray-900'
              }`}
          >
            {size}
          </li>
        ))}
      </ul>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}

export default SizeSelect;
