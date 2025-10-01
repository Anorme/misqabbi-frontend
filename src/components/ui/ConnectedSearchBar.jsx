import SearchBar from './SearchBar.jsx';
import useSearchWithRedirect from '../../hooks/useSearchWithRedirect';

const ConnectedSearchBar = ({ onSearchSubmit, ...props }) => {
  const { value, onChange, onClear, onEnterKey } = useSearchWithRedirect({ onSearchSubmit });

  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onClear={onClear}
      onKeyDown={onEnterKey}
      {...props}
    />
  );
};

export default ConnectedSearchBar;
