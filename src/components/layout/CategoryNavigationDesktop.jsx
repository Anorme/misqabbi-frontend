import { Columns4, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../ui/CategoryDropdown.jsx';
import SortDropdown from '../ui/SortDropdown.jsx';
import FilterDropdown from '../ui/FilterDropdown.jsx';
import PriceFilterModal from '../ui/PriceFilterModal.jsx';
import useCategorySelection from '../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../contexts/catalog/useCatalog.js';
import { setSortOption, setDesktopColumns } from '../../contexts/catalog/catalogActions.js';

const CategoryNavigationDesktop = () => {
  const { selectedCategory, selectCategory } = useCategorySelection();
  const { sortOption, layout } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const handleSortSelect = sortOption => {
    catalogDispatch(setSortOption(sortOption));
  };

  return (
    <div className="w-full border-t border-b border-[#949396]">
      <nav className="w-full bg-white" aria-label="Category Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Filters */}
            <div className="flex items-center h-full">
              <div className="flex items-center px-4 border-r border-r-[#949396] h-full">
                <CategoryDropdown
                  selectedCategory={selectedCategory}
                  onCategorySelect={selectCategory}
                  variant="desktop"
                />
              </div>
            </div>

            {/* Right: Sort, Filter, View Toggles */}
            <div className="flex items-center h-full">
              <div className="flex items-center px-4 border-l border-r border-[#949396] h-full">
                <SortDropdown
                  selectedSort={sortOption}
                  onSortSelect={handleSortSelect}
                  variant="desktop"
                />
              </div>
              <div className="flex items-center px-4 border-r border-r-[#949396] h-full">
                <FilterDropdown variant="desktop" />
              </div>
              <div className="flex items-center pl-4 space-x-2 h-full">
                <button
                  className={`${layout.desktopColumns === 4 ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                  aria-label="Set desktop layout to 4 columns"
                  aria-pressed={layout.desktopColumns === 4}
                  onClick={() => catalogDispatch(setDesktopColumns(4))}
                >
                  {/* Grid icon */}
                  <LayoutGrid className="fill-msq-gold-light stroke-none" size={20} />
                </button>
                <button
                  className={`${layout.desktopColumns === 6 ? 'opacity-100' : 'opacity-50'} cursor-pointer`}
                  aria-label="Set desktop layout to 6 columns"
                  aria-pressed={layout.desktopColumns === 6}
                  onClick={() => catalogDispatch(setDesktopColumns(6))}
                >
                  {/* List icon */}
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

export default CategoryNavigationDesktop;
