import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setPage } from '../contexts/catalog/catalogActions';

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
    <div className="flex items-center justify-center mt-12 space-x-2">
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className={`px-3 py-2 flex items-center gap-1 text-sm font-medium ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-msq-purple-deep hover:text-msq-purple-rich cursor-pointer '
        }`}
      >
        <ArrowLeft size={18} />
        Previous
      </button>

      {/* Page Indicator */}
      <button className="px-3 py-2 text-msq-purple-deep bg-msq-gold-light/20 rounded-md font-medium">
        {currentPage}
      </button>
      <span className="px-3 py-2 text-gray-500">of</span>
      <button className="px-3 py-2 text-gray-700 hover:text-msq-purple-rich hover:bg-msq-gold-light/10 rounded-md">
        {totalPages}
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 flex items-center gap-1 text-sm font-medium ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-msq-purple-deep hover:text-msq-purple-rich cursor-pointer'
        }`}
      >
        Next
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
