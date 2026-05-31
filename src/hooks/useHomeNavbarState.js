import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

const TRANSPARENT_NAV_ROUTES = new Set(['/', '/about-us']);

const useHomeNavbarState = (threshold = 24) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const usesTransparentHeroNav = TRANSPARENT_NAV_ROUTES.has(location.pathname);
  const [isSolid, setIsSolid] = useState(!usesTransparentHeroNav);

  useEffect(() => {
    if (!usesTransparentHeroNav) {
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
  }, [usesTransparentHeroNav, threshold]);

  const navSurfaceClass = useMemo(
    () => (isSolid ? 'bg-white shadow-sm border-none' : 'bg-transparent shadow-none'),
    [isSolid]
  );

  return { isHomePage, usesTransparentHeroNav, isSolid, navSurfaceClass };
};

export default useHomeNavbarState;
