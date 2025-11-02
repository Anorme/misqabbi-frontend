import { useState, useEffect } from 'react';

const useMediaQuery = query => {
  // Initialize with actual media query match if window is available
  // Defaults to true for mobile-first (helps avoid flash on mobile devices)
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    // For SSR or initial render, default to mobile-first for '(max-width: X)' queries
    return query.includes('max-width');
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    // Update if initial state was incorrect
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

export default useMediaQuery;
