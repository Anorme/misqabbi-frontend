// src/components/ProductGrid.jsx

const ProductGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {children}
    </div>
  );
};

export default ProductGrid;
