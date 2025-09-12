import { useEffect, useRef, useState } from 'react';
import CategoryCard from './CategoryCard';

// Placeholder data
const categories = [
  {
    name: 'Jean',
    image:
      'https://images.unsplash.com/photo-1714729382668-7bc3bb261662?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'T-Shirt',
    image:
      'https://plus.unsplash.com/premium_photo-1689536143095-eaa89c407aa7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Gown',
    image:
      'https://images.unsplash.com/photo-1752836094974-630711fb07c7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Lace',
    image:
      'https://images.unsplash.com/photo-1631233999975-3d559f0526e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Swimsuit',
    image:
      'https://plus.unsplash.com/premium_photo-1671748710834-fd02d65ca400?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function CategoryList() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = categories.slice(currentIndex, currentIndex + visibleCount);
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex + visibleCount >= categories.length;

  const handleResize = () => {
    const containerWidth = containerRef.current?.offsetWidth;
    const cardWidth = cardRef.current?.offsetWidth;
    if (containerWidth && cardWidth) {
      setVisibleCount(Math.floor(containerWidth / cardWidth));
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentIndex + visibleCount > categories.length) {
      setCurrentIndex(Math.max(categories.length - visibleCount, 0));
    }
  }, [visibleCount, currentIndex]);

  const scroll = direction => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - visibleCount, 0));
    } else if (direction === 'right' && currentIndex + visibleCount < categories.length) {
      setCurrentIndex(prev => prev + visibleCount);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full flex items-center justify-center ">
      {/* Hidden card for measurement */}
      <div className="absolute opacity-0 pointer-events-none" ref={cardRef}>
        <CategoryCard name={categories[0].name} image={categories[0].image} />
      </div>

      {/* Left arrow */}
      <button
        className={`sm:hidden z-10 rounded-full shadow p-2 -ml-3 ${isLeftDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
        onClick={() => scroll('left')}
        disabled={isLeftDisabled}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex py-2  mx-auto">
        {visibleCards.map((cat, idx) => (
          <div key={cat.name} ref={idx === 0 ? cardRef : null}>
            <CategoryCard name={cat.name} image={cat.image} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        className={`sm:hidden z-10 rounded-full shadow p-2 -mr-3 ${isRightDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
        onClick={() => scroll('right')}
        disabled={isRightDisabled}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default CategoryList;
