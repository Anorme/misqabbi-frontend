import { Link } from 'react-router';
import { ShoppingBag } from 'lucide-react';

import { useCartDispatch } from '../contexts/cart/useCart';
import { addToCart } from '../contexts/cart/cartActions';
import { showAddedToCartToast } from '../utils/showToast';
import FavoritesLinkButton from './favorites/FavoritesLinkButton';
import AuthActionModal from './auth/AuthActionModal';
import useAuthAction from '../hooks/useAuthAction';

const ProductCard = ({ product }) => {
  const dispatch = useCartDispatch();
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
        size: 'M',
      })
    );

    showAddedToCartToast();
  };

  const handleFavoriteClick = () => {
    requireAuth(() => {}, 'favorites');
  };

  return (
    <div className="bg-white border-none rounded-none w-full mx-auto">
      <div className="relative group">
        <Link to={`/product/${product.slug}`} className="block">
          <div className="aspect-[3/4] w-full relative">
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <FavoritesLinkButton
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              images: product.images,
              slug: product.slug,
            }}
            onAuthRequired={handleFavoriteClick}
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <h3 className="text-sm md:text-[20px] font-medium text-msq-purple uppercase text-left tracking-wide mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl md:text-[20px] font-bold text-msq-purple-deep">
            GHC {product.price}
          </span>
          <button type="button" aria-label="Add to cart" onClick={handleAddToCart}>
            {/* Shopping Cart SVG icon */}
            <ShoppingBag className="text-msq-gold-light cursor-pointer" size={30} />
          </button>
        </div>
      </div>

      {/* Auth Action Modal */}
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </div>
  );
};

export default ProductCard;
