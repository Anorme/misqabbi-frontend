import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router';

import CategoryCard from './CategoryCard';

// Placeholder data
const categories = [
  {
    name: 'Dresses',
    value: 'dresses',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957954/misqabbi/landing-page/CSI_0042_rlk5qt.jpg',
  },
  {
    name: 'Dungarees',
    value: 'dungarees',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1762026828/jpeg-optimizer_IMG_0004_copy_zzlpvt.jpg',
  },
  {
    name: 'Pants',
    value: 'pants',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957953/misqabbi/landing-page/CSI_9965_z6dikk.jpg',
  },
  {
    name: 'Skirts',
    value: 'skirts',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761963218/misqabbi/landing-page/CSI_9918_tf8mxm.jpg',
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
  const showArrows = categories.length > visibleCount;

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
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center px-12 sm:px-4"
    >
      {/* Hidden card for measurement */}
      <div className="absolute opacity-0 pointer-events-none" ref={cardRef}>
        <CategoryCard name={categories[0].name} image={categories[0].image} />
      </div>

      {/* Left arrow */}
      {showArrows && (
        <button
          className={`sm:hidden z-10 rounded-full shadow p-1 absolute left-2 top-2/3 -translate-y-1/2 ${isLeftDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
          onClick={() => scroll('left')}
          disabled={isLeftDisabled}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div className="flex py-2 mx-auto">
        {visibleCards.map((cat, idx) => (
          <div key={cat.name} ref={idx === 0 ? cardRef : null}>
            <Link to={`/category/${cat.value}`}>
              <CategoryCard name={cat.name} image={cat.image} />
            </Link>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      {showArrows && (
        <button
          className={`sm:hidden z-10 rounded-full shadow p-1 absolute right-2 top-2/3 -translate-y-1/2 ${isRightDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
          onClick={() => scroll('right')}
          disabled={isRightDisabled}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default CategoryList;
