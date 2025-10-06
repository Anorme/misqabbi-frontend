import { useEffect, useState } from 'react';
import { addToCart } from '../contexts/cart/cartActions';
import { useCartDispatch } from '../contexts/cart/useCart';

import { useParams } from 'react-router';
import BackButton from '../components/layout/BackButton';

import { fetchProductBySlug } from '../api/products';

import SizeSelect from '../components/ui/SizeSelect';
import ProductInfo from '../components/ui/ProductInfo';
import GalleryImages from '../components/ui/GalleryImages';
import QuantitySelector from '../components/ui/QuantitySelector';
import FavoritesLinkButton from '../components/favorites/FavoritesLinkButton';
import AuthActionModal from '../components/auth/AuthActionModal';
import useAuthAction from '../hooks/useAuthAction';

import { showAddedToCartToast } from '../utils/showToast';

function ProductDetails() {
  const { slug } = useParams();
  const cartDispatch = useCartDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    cartDispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        size: selectedSize,
        quantity: selectedQuantity,
      })
    );

    showAddedToCartToast();
  };

  const handleFavoriteClick = () => {
    requireAuth(() => {}, 'favorites');
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductBySlug(slug);
        setProduct(response);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Something went wrong while loading the product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">No product found.</p>;

  return (
    <div className="font-lato px-4 py-4 lg:py-8 bg-white">
      <header className="flex relative items-center justify-center">
        <BackButton />
        <p className="lg:hidden">Product Details</p>
      </header>

      <main className="overflow-hidden text-start flex flex-col gap-2">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 gap-5 py-6">
          {/* Images Section */}
          <div className="flex flex-col gap-5">
            <div className="relative">
              <img
                className="h-[25.75rem] lg:h-[40.125rem] w-full object-cover rounded-none"
                src={product.image || product.images[0]}
                alt={product?.name}
              />
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

            {/* Image Gallery */}
            <GalleryImages product={product}></GalleryImages>
          </div>

          {/* Product Info Section */}
          <div className="divide-y-2 divide-gray-300 max-w-[534px] lg:pt-4">
            <ProductInfo product={product}></ProductInfo>

            <SizeSelect selected={selectedSize} onChange={setSelectedSize}></SizeSelect>

            <div className="flex justify-between pb-6">
              <QuantitySelector quantity={selectedQuantity} onChange={setSelectedQuantity} />
            </div>

            {/* Product price and CTA */}
            <div className="flex py-6 space-x-5 justify-between">
              <div className="w-1/2 px-3 py-2 bg-[#EEE5E5] rounded-md flex flex-col max-w-[190px]">
                <p className="text-sm text-[#B1B2B2]">Total price:</p>
                <h1 className="text-2xl font-extrabold text-msq-purple-deep">
                  GHC {(product?.price * selectedQuantity).toFixed(2)}
                </h1>
              </div>
              <button
                className="bg-msq-purple-rich text-lg text-white rounded-md flex-grow max-w-[320px] cursor-pointer"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </div>
  );
}

export default ProductDetails;
