import { Triangle, Square, LayoutGrid } from 'lucide-react';
import CategoryDropdown from '../ui/CategoryDropdown.jsx';
import SortDropdown from '../ui/SortDropdown.jsx';
import useCategorySelection from '../../hooks/useCategorySelection.js';
import { useCatalogState, useCatalogDispatch } from '../../contexts/catalog/useCatalog.js';
import { setSortOption } from '../../contexts/catalog/catalogActions.js';

const CategoryNavigationMobile = () => {
  const { selectedCategory, selectCategory } = useCategorySelection();
  const { sortOption } = useCatalogState();
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

            {/* Right: View Toggle Icons */}
            <div className="flex items-center h-full space-x-2">
              <button className="p-1">
                {/* Single column icon */}
                <Square className="stroke-msq-gold-light fill-msq-gold-light" size={20} />
              </button>
              <button className="p-1">
                {/* 2x2 grid icon */}
                <LayoutGrid className="fill-msq-gold-light stroke-none" size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNavigationMobile;
