import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-[70px]">
      <button
        onClick={onPrevious}
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
        onClick={onNext}
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
