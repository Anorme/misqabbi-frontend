import React, { useRef } from 'react';
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
  const scrollRef = useRef(null);

  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center ">
      <button
        className="sm:hidden z-10 bg-white rounded-full shadow p-2 -ml-3"
        onClick={() => scroll('left')}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar py-2  mx-auto">
        {categories.map(cat => (
          <CategoryCard key={cat.name} name={cat.name} image={cat.image} />
        ))}
      </div>

      <button
        className="sm:hidden z-10 bg-white rounded-full shadow p-2 -mr-3"
        onClick={() => scroll('right')}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default CategoryList;
