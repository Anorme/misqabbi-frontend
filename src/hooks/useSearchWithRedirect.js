import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useCatalogState, useCatalogDispatch } from '../contexts/catalog/useCatalog';
import {
  setSearchQuery,
  setSearchFromURL,
  clearSearchAndURL,
} from '../contexts/catalog/catalogActions';

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
  const timeoutRef = useRef(null);

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
      category: searchParams.get('category') || '',
    };

    // Only update if URL has search params and they're different from current state
    if (Object.values(urlParams).some(value => value)) {
      dispatch(setSearchFromURL(urlParams));
    }
  }, []); // Only run on mount

  // Debounced search (for typing feedback)
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

    if (currentSearchParams.category) {
      newParams.set('category', currentSearchParams.category);
    } else {
      newParams.delete('category');
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

    // Redirect to /shop if not already there
    if (location.pathname !== '/shop') {
      navigate('/shop');
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
