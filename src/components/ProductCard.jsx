import { Heart, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border-none rounded-none shadow-sm hover:shadow-md transition-shadow duration-200 max-w-[320px] w-full mx-auto">
      <div className="relative group">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute top-3 right-3 p-2 bg-none"
        >
          {/* Heart SVG icon */}
          <Heart
            className="text-msq-gold-light cursor-pointer transition-colors duration-200 hover:fill-msq-gold-light active:fill-msq-gold-light"
            size={30}
          />
        </button>
      </div>
      <div className="px-4 py-2">
        <h3 className="text-sm md:text-[20px] font-medium text-msq-purple uppercase text-left tracking-wide mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl md:text-3xl font-bold text-msq-purple-deep">
            GHC {product.price}
          </span>
          <button type="button" aria-label="Add to cart">
            {/* Shopping Cart SVG icon */}
            <ShoppingBag className="text-msq-gold-light cursor-pointer" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
