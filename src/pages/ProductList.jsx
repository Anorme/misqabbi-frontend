import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductList = () => {
  const [selected, setSelected] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const options = ['All', 'Newest', 'Oldest', 'Popular'];

  // Mock products
  const products = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Description of product ${index + 1}`,
    price: '$19.99',
    image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
  }));

  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="h-auto">
      <h1 className="text-[#4a0579] text-2xl flex justify-self-start font-mono pl-[20px]">
        MISQAABI/ <span className="text-[#630254]">Shop </span>
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center">
        <h1 className="text-[#630254] text-5xl font-sans flex justify-start ml-[140px] mt-[50px]">
          Items
        </h1>
        <ul className="flex flex-wrap justify-center text-xl pt-3 w-full lg:w-[700px] h-auto lg:h-[50px] mt-[20px] lg:mt-[50px] lg:ml-[100px] gap-2">
          {['Shirt', 'T-Shirt', 'Accessories', 'Jacket', 'Cap', 'Jeans'].map((item) => (
            <li
              key={item}
              className="hover:text-white hover:bg-[#630254] w-[150px] h-[50px] bg-white 
              text-[#630254] p-3 rounded-sm text-center"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-2 mt-[20px] lg:mt-[70px] lg:ml-[300px]">
          <label htmlFor="filter" className="text-xl text-[#630254]">
            Filter:
          </label>
          <select
            id="filter"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none 
            focus:ring-2 focus:ring-[#a78bfa] h-[50px]"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Sidebar */}
        <div className="bg-white w-full lg:w-[300px] h-auto lg:h-[15rem] ml-0 lg:ml-[5rem] mt-[2rem] lg:mt-[5rem] rounded-lg p-4">
          <h1 className="text-2xl text-[#630254]">Brands</h1>
          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full mt-5 pl-10 pr-4 py-2 border rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mt-5">
            <span className="flex gap-6 justify-center">
              {['S', 'M', 'L'].map((size) => (
                <h1
                  key={size}
                  className="bg-gray-200 w-[40px] h-[40px] text-lg flex items-center justify-center text-[#630254]"
                >
                  {size}
                </h1>
              ))}
            </span>
            <span className="flex gap-6 justify-center mt-5">
              {['XL', 'XXL'].map((size) => (
                <h1
                  key={size}
                  className="bg-gray-200 w-[40px] h-[40px] text-lg flex items-center justify-center text-[#630254]"
                >
                  {size}
                </h1>
              ))}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col w-full lg:ml-[5rem] mt-[2rem] lg:mt-[5rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-white w-full sm:w-[300px] lg:w-[400px] h-auto p-4 rounded-lg shadow-md mx-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-[#630254] mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <span className="text-[#630254] font-bold">{product.price}</span>
                <button className="mt-2 bg-[#630254] text-white px-4 py-2 rounded hover:bg-[#5b0792]">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#630254] text-white hover:bg-[#5b0792]'}`}
            >
              <FaArrowLeft />
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#630254] text-white hover:bg-[#5b0792]'}`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
