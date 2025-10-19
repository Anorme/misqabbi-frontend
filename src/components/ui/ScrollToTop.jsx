import { useEffect } from 'react';
import { useLocation } from 'react-router';
import scrollToTop from '../../utils/scrollToTop';

/**
 * Component that automatically scrolls to top when route changes
 * This ensures users start at the top of the page when navigating between routes
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location (route) changes
    scrollToTop();
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
