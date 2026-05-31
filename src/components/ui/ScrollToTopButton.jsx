import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import scrollToTop from '../../utils/scrollToTop';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => scrollToTop({ behavior: 'smooth' })}
      className={`fixed cursor-pointer bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-msq-gold bg-msq-gold text-white shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msq-gold focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:h-12 sm:w-12 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ChevronUp size={24} strokeWidth={2.25} className="text-white" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
