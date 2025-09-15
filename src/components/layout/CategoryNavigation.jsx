import { Triangle, Columns4, LayoutGrid } from 'lucide-react';

const CategoryNavigation = () => {
  return (
    <nav className="px-6" aria-label="Category Navigation">
      <div className="w-full">
        <div className="flex items-center justify-between h-12">
          {/* Left: Category Filters */}
          <div className="flex items-center h-full">
            <div className="flex items-center px-4 border-r border-r-[#949396] h-full">
              <button className="flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                ALL CATEGORIES
                <Triangle className="ml-1 fill-msq-gold-light rotate-180 stroke-none" size={10} />
              </button>
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
              <button className="flex items-center text-msq-purple-deep hover:text-msq-purple-rich font-medium">
                SORT BY
                <Triangle className="ml-1 fill-msq-gold-light rotate-180 stroke-none" size={10} />
              </button>
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
  );
};

export default CategoryNavigation;
