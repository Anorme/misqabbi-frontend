import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductList = () => {
  const [selected, setSelected] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = ['All', 'Newest', 'Oldest', 'Popular'];
  const productsPerPage = 6;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data?.data || []); // adjust if backend structure differs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        MISQAABI/ <span className="text-[#c01da8]">Shop </span>
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center">
        <h1 className="text-[#630254] text-5xl font-sans flex justify-start ml-[140px] mt-[50px]">
          Items
        </h1>
        <ul className="flex flex-wrap justify-center text-xl pt-3 w-full lg:w-[700px] h-auto lg:h-[50px] mt-[20px] lg:mt-[50px] lg:ml-[100px] gap-2">
          {['Shirt', 'T-Shirt', 'Accessories', 'Jacket', 'Cap', 'Jeans'].map(item => (
            <li
              key={item}
              className="text-white bg-[#c01da8] w-[150px] h-[50px] hover:bg-white 
              hover:text-[#c01da8] p-3 rounded-sm text-center"
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
            onChange={e => setSelected(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-[#c01da8] border-[#c01da8] text-white hover:text-[#c01da8] hover:bg-white focus:outline-none 
            focus:ring-2 focus:ring-[#a78bfa] h-[50px]"
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Sidebar */}
        <div className="bg-white border-[#c01da8] border-4 w-full lg:w-[300px] h-auto lg:h-[15rem] ml-0 lg:ml-[3rem] mt-[2rem] lg:mt-[5rem] rounded-lg p-4">
          <h1 className="text-2xl text-[#630254]">Brands</h1>
          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c01da8]" />
            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full mt-5 pl-10 pr-4 py-2 border-[#c01da8] rounded-lg shadow-xl 
              focus:outline-[#c01da8] focus:ring-2 focus:ring-[#c01da8]"
            />
          </div>

          <div className="mt-5">
            <span className="flex gap-6 justify-center">
              {['S', 'M', 'L'].map(size => (
                <h1
                  key={size}
                  className="bg-gray-200 w-[40px] h-[40px] text-lg flex items-center justify-center text-[#630254]"
                >
                  {size}
                </h1>
              ))}
            </span>
            <span className="flex gap-6 justify-center mt-5">
              {['XL', 'XXL'].map(size => (
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
        <div className="flex flex-col w-full lg:ml-[3rem] mt-[3rem] lg:mt-[5rem] ">
          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white max-w-[320px] w-full h-auto p-3 rounded-lg shadow-md mx-auto"
                  >
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-36 object-cover rounded-md"
                    />
                    <div className="mt-3 text-center">
                      <h2 className="text-base font-semibold text-[#630254] mb-1">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <span className="block text-[#630254] font-bold mb-2">{product.price}</span>
                      <button className="bg-[#630254] text-white px-3 py-1.5 rounded hover:bg-[#5b0792] text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-6 mt-[70px]">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#630254] text-white hover:bg-[#5b0792]'
                  }`}
                >
                  <FaArrowLeft />
                </button>
                <span className="text-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#630254] text-white hover:bg-[#5b0792]'
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
