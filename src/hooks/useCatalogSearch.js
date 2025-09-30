import { useEffect, useRef, useState } from 'react';
import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import { setSearchQuery, clearSearch } from '../contexts/catalog/catalogActions';

export default function useCatalogSearch({ debounceMs = 400 } = {}) {
  const { searchQuery } = useCatalogState();
  const dispatch = useCatalogDispatch();
  const [local, setLocal] = useState(searchQuery || '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocal(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (local !== searchQuery) {
        dispatch(setSearchQuery(local));
      }
    }, debounceMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [local, searchQuery, debounceMs, dispatch]);

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
