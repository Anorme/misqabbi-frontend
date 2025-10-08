import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function useLandingSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onChange = valueOrEvent => {
    const value = valueOrEvent && valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
    setQuery(value);
  };

  const onClear = () => {
    setQuery('');
  };

  const onSearchSubmit = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      navigate(`/shop?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const onEnterKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  return {
    value: query,
    onChange,
    onClear,
    onSearchSubmit,
    onEnterKey,
  };
}
