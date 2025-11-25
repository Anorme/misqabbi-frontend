const QuantitySelector = ({ quantity, onChange }) => {
  const increase = () => onChange(quantity + 1);
  const decrease = () => onChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex flex-col gap-0">
      <h2 className="text-base sm:text-lg lg:text-xl p-1">Quantity</h2>
      <div className="flex items-center gap-3 sm:gap-4 border border-solid p-2 border-msq-gold-light">
        {/* Decrease button */}
        <button
          onClick={decrease}
          className="px-2 sm:px-3 py-1 text-xs sm:text-base font-bold bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors duration-200"
        >
          −
        </button>

        {/* Quantity display */}
        <span className="text-base sm:text-lg font-medium">{quantity}</span>

        {/* Increase button */}
        <button
          onClick={increase}
          className="px-2 sm:px-3 py-1 text-xs sm:text-base font-bold bg-msq-gold-light text-white rounded hover:bg-msq-gold cursor-pointer transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
