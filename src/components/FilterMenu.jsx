import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setFilter } from '../contexts/catalog/catalogActions';

const FilterMenu = ({ options = [], className = '' }) => {
  const { selectedFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const handleFilterChange = e => {
    catalogDispatch(setFilter(e.target.value));
  };

  return (
    <div
      className={`flex flex-wrap justify-center gap-2 mt-[20px] lg:mt-[70px] lg:ml-[300px] ${className}`}
    >
      <label htmlFor="filter" className="text-xl text-[#630254]">
        Filter:
      </label>
      <select
        id="filter"
        value={selectedFilter}
        onChange={handleFilterChange}
        className="border rounded-lg px-3 py-2 bg-[#c01da8] border-[#c01da8] text-white hover:text-[#c01da8] hover:bg-white focus:outline-none 
        focus:ring-2 focus:ring-[#a78bfa] h-[50px]"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterMenu;
