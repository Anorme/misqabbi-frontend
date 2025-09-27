import { Triangle, Square, LayoutGrid } from 'lucide-react';

const CategoryNavigationMobile = () => {
  return (
    <div className="w-full pt-4">
      <nav className="w-full bg-white" aria-label="Category Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Dropdown*/}
            <div className="flex items-center h-full">
              <div className="flex items-center">
                <button className="flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                  ALL CATEGORIES
                  <Triangle className="ml-2 fill-msq-gold-light rotate-180 stroke-none" size={10} />
                </button>
              </div>
            </div>

            {/* Middle: Sort Dropdown */}
            <div className="flex items-center">
              <button className="flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                SORT BY
                <Triangle className="ml-2 fill-msq-gold-light rotate-180 stroke-none" size={10} />
              </button>
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
