import { Columns4, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../../search/CategoryDropdown.jsx';
import SortDropdown from '../../search/SortDropdown.jsx';
import FilterDropdown from '../../search/FilterDropdown.jsx';
import PriceFilterModal from '../../search/PriceFilterModal.jsx';
import useCategorySelection from '../../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../../contexts/catalog/useCatalog.js';
import { setSortOption, setTabletColumns } from '../../../contexts/catalog/catalogActions.js';

const CategoryNavigationTablet = () => {
  const { selectedCategory } = useCategorySelection();
  const { sortOption, layout } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const handleSortSelect = sortOption => {
    catalogDispatch(setSortOption(sortOption));
  };

  return (
    <div className="w-full border-t border-b border-gray-200 bg-white">
      <nav className="w-full" aria-label="Category Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Filters */}
            <div className="flex items-center h-full">
              <div className="flex items-center px-4 border-r border-gray-200 h-full">
                <CategoryDropdown selectedCategory={selectedCategory} variant="desktop" />
              </div>
            </div>

            {/* Right: Sort, Filter, View Toggles */}
            <div className="flex items-center h-full">
              <div className="flex items-center px-4 border-l border-r border-gray-200 h-full">
                <SortDropdown
                  selectedSort={sortOption}
                  onSortSelect={handleSortSelect}
                  variant="desktop"
                />
              </div>
              <div className="flex items-center px-4 border-r border-gray-200 h-full">
                <FilterDropdown variant="desktop" />
              </div>
              <div className="flex items-center pl-4 space-x-2 h-full">
                <button
                  className={`${layout.tabletColumns === 2 ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                  aria-label="Set tablet layout to 2 columns"
                  aria-pressed={layout.tabletColumns === 2}
                  onClick={() => catalogDispatch(setTabletColumns(2))}
                >
                  {/* Two-column tablet grid */}
                  <LayoutGrid className="fill-msq-gold-light stroke-none" size={20} />
                </button>
                <button
                  className={`${layout.tabletColumns === 4 ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                  aria-label="Set tablet layout to 4 columns"
                  aria-pressed={layout.tabletColumns === 4}
                  onClick={() => catalogDispatch(setTabletColumns(4))}
                >
                  {/* Four-column tablet grid */}
                  <Columns4 className="stroke-msq-gold-light" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <PriceFilterModal />
    </div>
  );
};

export default CategoryNavigationTablet;
