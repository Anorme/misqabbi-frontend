const PaginationLocal = ({ page, totalPages, onPrev, onNext }) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-center mt-8 gap-4">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`px-3 py-2 text-sm font-medium ${
          canPrev
            ? 'text-msq-purple-deep hover:text-msq-purple-rich'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="px-3 py-2 text-msq-purple-deep bg-msq-gold-light/20 rounded-md font-medium">
        {page}
      </span>
      <span className="px-1 py-2 text-gray-500">of</span>
      <span className="px-3 py-2 text-gray-700">{totalPages}</span>
      <button
        onClick={onNext}
        disabled={!canNext}
        className={`px-3 py-2 text-sm font-medium ${
          canNext
            ? 'text-msq-purple-deep hover:text-msq-purple-rich'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationLocal;
