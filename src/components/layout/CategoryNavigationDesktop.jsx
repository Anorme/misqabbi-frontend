import { Triangle, Columns4, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../ui/CategoryDropdown.jsx';
import SortDropdown from '../ui/SortDropdown.jsx';
import useCategorySelection from '../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../contexts/catalog/useCatalog.js';
import { setSortOption } from '../../contexts/catalog/catalogActions.js';

const CategoryNavigationDesktop = () => {
  const { selectedCategory, selectCategory } = useCategorySelection();
  const { sortOption } = useCatalogState();
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
              <div className="flex items-center px-4 border-r border-r-[#949396] h-full">
                <button className="text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                  BEST SELLERS
                </button>
              </div>
              <div className="flex items-center border-r border-r-[#949396] px-4 h-full">
                <button className="text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                  NEWEST ARRIVALS
                </button>
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
                <button className="flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                  FILTER
                  <Triangle className="ml-1 fill-msq-gold-light rotate-180 stroke-none" size={10} />
                </button>
              </div>
              <div className="flex items-center pl-4 space-x-2 h-full">
                <button className="">
                  {/* Grid icon */}
                  <LayoutGrid className="fill-msq-gold-light stroke-none" size={20} />
                </button>
                <button className="">
                  {/* List icon */}
                  <Columns4 className="stroke-msq-gold-light" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNavigationDesktop;
