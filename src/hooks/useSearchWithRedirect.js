import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import {
  setSearchQuery,
  setSearchFromURL,
  clearSearchAndURL,
} from '../contexts/catalog/catalogActions';
import { useDebounce } from '../utils/debounce';

export default function useSearchWithRedirect({
  debounceMs = 400,
  onSearchSubmit: customOnSearchSubmit,
} = {}) {
  const { searchQuery } = useCatalogState();
  const dispatch = useCatalogDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [local, setLocal] = useState(searchQuery || '');

  // Use debounced value for dispatching search query
  useDebounce(local, debounceMs, value => {
    if (value !== searchQuery) {
      dispatch(setSearchQuery(value));
    }
  });

  // Sync with external searchQuery prop
  useEffect(() => {
    setLocal(searchQuery || '');
  }, [searchQuery]);

  // Initialize search state from URL on mount
  useEffect(() => {
    const urlParams = {
      q: searchParams.get('q') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    };

    // Only update if URL has search params and they're different from current state
    if (Object.values(urlParams).some(value => value)) {
      dispatch(setSearchFromURL(urlParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Get current search params from context
  const { searchParams: currentSearchParams } = useCatalogState();

  // Update URL when search params change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    // Update URL params based on current search state
    if (currentSearchParams.q) {
      newParams.set('q', currentSearchParams.q);
    } else {
      newParams.delete('q');
    }

    if (currentSearchParams.minPrice) {
      newParams.set('minPrice', currentSearchParams.minPrice);
    } else {
      newParams.delete('minPrice');
    }

    if (currentSearchParams.maxPrice) {
      newParams.set('maxPrice', currentSearchParams.maxPrice);
    } else {
      newParams.delete('maxPrice');
    }

    // Only update URL if params actually changed
    const newParamsString = newParams.toString();
    const currentParamsString = searchParams.toString();
    if (newParamsString !== currentParamsString) {
      setSearchParams(newParams, { replace: true });
    }
  }, [currentSearchParams, setSearchParams, searchParams]);

  const onChange = valueOrEvent => {
    const value = valueOrEvent && valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
    setLocal(value);
  };

  const onClear = () => {
    setLocal('');
    dispatch(clearSearchAndURL());
    // Clear URL params
    setSearchParams({}, { replace: true });
  };

  const onSearchSubmit = () => {
    const trimmedQuery = local.trim();

    // If empty query, clear search and stay on current page
    if (!trimmedQuery) {
      onClear();
      return;
    }

    // Update search state immediately
    dispatch(setSearchQuery(trimmedQuery));

    // Call custom callback if provided (e.g., close mobile search)
    if (customOnSearchSubmit) {
      customOnSearchSubmit();
    }

    // Redirect to /shop with query parameter if not already there
    if (location.pathname !== '/shop') {
      navigate(`/shop?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      // If already on /shop, just update the URL params
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', trimmedQuery);
      setSearchParams(newParams, { replace: true });
    }
  };

  const onEnterKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  return {
    value: local,
    onChange,
    onClear,
    onSearchSubmit,
    onEnterKey,
  };
}
