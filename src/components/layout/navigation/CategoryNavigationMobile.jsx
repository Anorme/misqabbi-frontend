import { Square, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../../search/CategoryDropdown.jsx';
import SortDropdown from '../../search/SortDropdown.jsx';
import FilterDropdown from '../../search/FilterDropdown.jsx';
import PriceFilterModal from '../../search/PriceFilterModal.jsx';
import useCategorySelection from '../../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../../contexts/catalog/useCatalog.js';
import { setSortOption, setMobileColumns } from '../../../contexts/catalog/catalogActions.js';

const CategoryNavigationMobile = () => {
  const { selectedCategory, selectCategory } = useCategorySelection();
  const { sortOption, layout } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const handleSortSelect = sortOption => {
    catalogDispatch(setSortOption(sortOption));
  };

  return (
    <div className="w-full pt-4">
      <nav className="w-full bg-white" aria-label="Category Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Dropdown*/}
            <div className="flex items-center h-full">
              <div className="flex items-center">
                <CategoryDropdown
                  selectedCategory={selectedCategory}
                  onCategorySelect={selectCategory}
                  variant="mobile"
                />
              </div>
            </div>

            {/* Middle: Sort Dropdown */}
            <div className="flex items-center">
              <SortDropdown
                selectedSort={sortOption}
                onSortSelect={handleSortSelect}
                variant="mobile"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center">
              <FilterDropdown variant="mobile" />
            </div>

            {/* Right: View Toggle Icons */}
            <div className="flex items-center h-full space-x-2">
              <button
                className={`p-1 ${layout.mobileColumns === 1 ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Set mobile layout to 1 column"
                aria-pressed={layout.mobileColumns === 1}
                onClick={() => catalogDispatch(setMobileColumns(1))}
              >
                {/* Single column icon */}
                <Square className="stroke-msq-gold-light fill-msq-gold-light" size={20} />
              </button>
              <button
                className={`p-1 ${layout.mobileColumns === 2 ? 'opacity-100' : 'opacity-50'}`}
                aria-label="Set mobile layout to 2 columns"
                aria-pressed={layout.mobileColumns === 2}
                onClick={() => catalogDispatch(setMobileColumns(2))}
              >
                {/* 2x2 grid icon */}
                <LayoutGrid className="fill-msq-gold-light stroke-none" size={20} />
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
