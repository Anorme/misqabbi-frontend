import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setPage } from '../contexts/catalog/catalogActions';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = () => {
  const { currentPage, totalPages } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const goToPrevious = () => {
    if (currentPage > 1) catalogDispatch(setPage(currentPage - 1));
  };

  const goToNext = () => {
    if (currentPage < totalPages) catalogDispatch(setPage(currentPage + 1));
  };

  return (
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
  );
};

export default Pagination;
