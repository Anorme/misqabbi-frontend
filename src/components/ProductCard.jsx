// src/components/ProductCard.jsx

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white max-w-[320px] w-full h-auto p-3 rounded-lg shadow-md mx-auto">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="mt-3 text-center">
        <h2 className="text-base font-semibold text-[#630254] mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <span className="block text-[#630254] font-bold mb-2">{product.price}</span>
        <button className="bg-[#630254] text-white px-3 py-1.5 rounded hover:bg-[#5b0792] text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
