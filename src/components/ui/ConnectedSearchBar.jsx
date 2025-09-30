import SearchBar from './SearchBar.jsx';
import useCatalogSearch from '../../hooks/useCatalogSearch';

const ConnectedSearchBar = props => {
  const { value, onChange, onClear } = useCatalogSearch();

  return <SearchBar value={value} onChange={onChange} onClear={onClear} {...props} />;
};

export default ConnectedSearchBar;
