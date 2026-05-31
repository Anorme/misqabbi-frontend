import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

const useHomeNavbarState = (threshold = 24) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isSolid, setIsSolid] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsSolid(true);
      return;
    }

    const handleScroll = () => {
      setIsSolid(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage, threshold]);

  const navSurfaceClass = useMemo(
    () => (isSolid ? 'bg-white shadow-sm border-none' : 'bg-transparent shadow-none'),
    [isSolid]
  );

  return { isHomePage, isSolid, navSurfaceClass };
};

export default useHomeNavbarState;
