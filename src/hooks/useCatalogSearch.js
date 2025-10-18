import { useEffect, useState } from 'react';
import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setSearchQuery, clearSearch } from '../contexts/catalog/catalogActions';
import { useDebounce } from '../utils/debounce';

export default function useCatalogSearch({ debounceMs = 400 } = {}) {
  const { searchQuery } = useCatalogState();
  const dispatch = useCatalogDispatch();
  const [local, setLocal] = useState(searchQuery || '');

  // Use debounced value for dispatching search query
  useDebounce(local, debounceMs, value => {
    if (value !== searchQuery) {
      dispatch(setSearchQuery(value));
    }
  });

  useEffect(() => {
    setLocal(searchQuery || '');
  }, [searchQuery]);

  const onChange = valueOrEvent => {
    const value = valueOrEvent && valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
    setLocal(value);
  };

  const onClear = () => {
    setLocal('');
    dispatch(clearSearch());
  };

  return { value: local, onChange, onClear };
}
