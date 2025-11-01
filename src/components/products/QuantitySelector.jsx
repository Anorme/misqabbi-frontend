const QuantitySelector = ({ quantity, onChange }) => {
  const increase = () => onChange(quantity + 1);
  const decrease = () => onChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base sm:text-lg lg:text-2xl px-1">Quantity</h2>
      <div className="flex items-center gap-3 sm:gap-4 border border-solid p-2 sm:p-3 border-[#CFB484]">
        {/* Decrease button */}
        <button
          onClick={decrease}
          className="px-2 sm:px-3 py-1 text-base sm:text-lg font-bold bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>

        {/* Quantity display */}
        <span className="text-base sm:text-lg font-medium">{quantity}</span>

        {/* Increase button */}
        <button
          onClick={increase}
          className="px-2 sm:px-3 py-1 text-base sm:text-lg font-bold bg-[#CFB484] text-white rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
