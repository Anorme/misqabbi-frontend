import { useState } from 'react';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl px-1">Quantity</h2>
      <div className="flex items-center gap-4 border border-solid p-3 border-[#CFB484]">
        {/* Decrease button */}
        <button
          onClick={decrease}
          className="px-3 py-1 text-lg font-bold bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>

        {/* Quantity display */}
        <span className="text-lg font-medium">{quantity}</span>

        {/* Increase button */}
        <button
          onClick={increase}
          className="px-3 py-1 text-lg font-bold bg-[#CFB484] text-white rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
