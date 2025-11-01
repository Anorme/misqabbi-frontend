import { Square, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../../search/CategoryDropdown.jsx';
import SortDropdown from '../../search/SortDropdown.jsx';
import FilterDropdown from '../../search/FilterDropdown.jsx';
import PriceFilterModal from '../../search/PriceFilterModal.jsx';
import useCategorySelection from '../../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../../contexts/catalog/useCatalog.js';
import { setSortOption, setMobileColumns } from '../../../contexts/catalog/catalogActions.js';

const CategoryNavigationMobile = () => {
  const { selectedCategory } = useCategorySelection();
  const { sortOption, layout } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const handleSortSelect = sortOption => {
    catalogDispatch(setSortOption(sortOption));
  };

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 w-full border-t border-b border-[#949396] bg-white">
      <nav className="w-full" aria-label="Category Navigation">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Dropdown*/}
            <div className="flex items-center h-full flex-1 min-w-0">
              <CategoryDropdown selectedCategory={selectedCategory} variant="mobile" />
            </div>

            {/* Divider */}
            <div className="h-full w-px bg-[#949396] mx-1 sm:mx-2 flex-shrink-0" />

            {/* Middle: Sort Dropdown */}
            <div className="flex items-center flex-shrink-0">
              <SortDropdown
                selectedSort={sortOption}
                onSortSelect={handleSortSelect}
                variant="mobile"
              />
            </div>

            {/* Divider */}
            <div className="h-full w-px bg-[#949396] mx-1 sm:mx-2 flex-shrink-0" />

            {/* Filter Dropdown */}
            <div className="flex items-center flex-shrink-0">
              <FilterDropdown variant="mobile" />
            </div>

            {/* Divider */}
            <div className="h-full w-px bg-[#949396] mx-1 sm:mx-2 flex-shrink-0" />

            {/* Right: View Toggle Icons */}
            <div className="flex items-center h-full space-x-1 sm:space-x-2 flex-shrink-0">
              <button
                className={`p-1 flex-shrink-0 ${layout.mobileColumns === 1 ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Set mobile layout to 1 column"
                aria-pressed={layout.mobileColumns === 1}
                onClick={() => catalogDispatch(setMobileColumns(1))}
              >
                {/* Single column icon */}
                <Square className="stroke-msq-gold-light fill-msq-gold-light" size={18} />
              </button>
              <button
                className={`p-1 flex-shrink-0 ${layout.mobileColumns === 2 ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Set mobile layout to 2 columns"
                aria-pressed={layout.mobileColumns === 2}
                onClick={() => catalogDispatch(setMobileColumns(2))}
              >
                {/* 2x2 grid icon */}
                <LayoutGrid className="fill-msq-gold-light stroke-none" size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <PriceFilterModal />
    </div>
  );
};

export default CategoryNavigationMobile;
