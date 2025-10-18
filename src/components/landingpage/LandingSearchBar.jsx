import SearchBar from '../search/SearchBar.jsx';
import useLandingSearch from '../../hooks/useLandingSearch.js';

const LandingSearchBar = ({ onSearchSubmit, ...props }) => {
  const { value, onChange, onClear, onSearchSubmit: hookSearchSubmit } = useLandingSearch();

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      hookSearchSubmit();

      // Call custom callback if provided (e.g., close mobile search)
      if (onSearchSubmit) {
        onSearchSubmit();
      }
    }
  };

  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onClear={onClear}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default LandingSearchBar;
