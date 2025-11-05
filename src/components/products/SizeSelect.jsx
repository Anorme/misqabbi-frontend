function SizeSelect({ selected, onChange }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  function handleSizeSelect(size) {
    if (onChange) onChange(size);
  }

  return (
    <div className="flex flex-col gap-0 pb-4">
      <h2 className="text-base sm:text-lg lg:text-xl">Size</h2>
      <ul className="flex gap-2 justify-around flex-wrap">
        {sizes.map(size => (
          <li
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`cursor-pointer border px-3 sm:px-4 py-1 rounded-md transition text-sm sm:text-base
              ${
                selected === size
                  ? 'bg-msq-gold-light text-white border-msq-gold-light'
                  : 'bg-gray-100 border-0 hover:bg-gray-200'
              }`}
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SizeSelect;
