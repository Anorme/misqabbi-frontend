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
  return (
    <div className="flex justify-center overflow-x-auto py-2">
      {categories.map(cat => (
        <CategoryCard key={cat.name} name={cat.name} image={cat.image} />
      ))}
    </div>
  );
}

export default CategoryList;
