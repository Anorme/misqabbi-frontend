import { useState } from 'react';

function SizeSelect({ onChange }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const [selectedSize, setSelectedSize] = useState('');

  function handleSizeSelect(size) {
    setSelectedSize(size);
    if (onChange) {
      onChange(size);
    }
  }

  return (
    <div className="flex flex-col gap-2 pb-6">
      <h2 className="text-2xl ">Size</h2>
      <ul className="flex gap-2 justify-around flex-wrap">
        {sizes.map(size => (
          <li
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`cursor-pointer border px-4 py-2 rounded-md transition 
              ${
                selectedSize === size
                  ? 'bg-[#cfb484] text-white border[#cfb484]'
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
