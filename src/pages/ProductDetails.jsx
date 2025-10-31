import { useEffect, useState } from 'react';
import { addToCart } from '../contexts/cart/cartActions';
import { useCartDispatch } from '../contexts/cart/useCart';

import { useParams, useNavigate } from 'react-router';
import BackButton from '../components/layout/BackButton';

import { fetchProductBySlug } from '../api/products';

import SizeSelect from '../components/products/SizeSelect';
import ProductInfo from '../components/products/ProductInfo';
import GalleryImages from '../components/products/GalleryImages';
import QuantitySelector from '../components/products/QuantitySelector';
import CustomSizeInput from '../components/products/CustomSizeInput';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import FavoritesLinkButton from '../components/favorites/FavoritesLinkButton';
import AuthActionModal from '../components/auth/AuthActionModal';
import useAuthAction from '../hooks/useAuthAction';
import SEO from '../components/SEO';
import StructuredData from '../components/seo/StructuredData';

import scrollToTop from '../utils/scrollToTop';
import { showAddedToCartToast } from '../utils/showToast';
import { supportsCustomSizing } from '../constants/customSizeMeasurements';
import { isCustomSizeComplete } from '../utils/customSizeValidation';
import { getPrimaryImageUrl } from '../utils/productImages';

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cartDispatch = useCartDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCustomSizeEnabled, setIsCustomSizeEnabled] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState({});
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();

  const handleAddToCart = () => {
    // Validate custom size if enabled
    if (isCustomSizeEnabled && !isCustomSizeComplete(customMeasurements, product?.category)) {
      alert('Please complete all custom measurements');
      return;
    }

    // Validate standard size if not using custom size
    if (!isCustomSizeEnabled && !selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
      size: isCustomSizeEnabled ? 'CUSTOM' : selectedSize,
      quantity: selectedQuantity,
    };

    // Add custom measurements if enabled
    if (isCustomSizeEnabled) {
      cartItem.customSize = customMeasurements;
    }

    cartDispatch(addToCart(cartItem));
    showAddedToCartToast();
  };

  const handleBuyNow = () => {
    // Check authentication first
    if (!requireAuth(() => {}, 'checkout')) {
      return; // Auth modal will be shown, don't proceed
    }

    // Validate custom size if enabled
    if (isCustomSizeEnabled && !isCustomSizeComplete(customMeasurements, product?.category)) {
      alert('Please complete all custom measurements');
      return;
    }

    // Validate standard size if not using custom size
    if (!isCustomSizeEnabled && !selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
      size: isCustomSizeEnabled ? 'CUSTOM' : selectedSize,
      quantity: selectedQuantity,
    };

    // Add custom measurements if enabled
    if (isCustomSizeEnabled) {
      cartItem.customSize = customMeasurements;
    }

    // Add to cart first
    cartDispatch(addToCart(cartItem));

    // Navigate to checkout
    navigate('/checkout');
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

  // Scroll to top when loading completes (new results loaded)
  useEffect(() => {
    if (!loading) {
      scrollToTop();
    }
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <LoadingSpinner size={80} color="#cfb484" />
      </div>
    );
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">No product found.</p>;

  return (
    <div className="font-lato px-4 py-4 lg:py-8 bg-white">
      {product && (
        <>
          <SEO
            title={product.name}
            description={product.description || `Shop ${product.name} at Misqabbi.`}
            canonicalPath={`/product/${product.slug}`}
            image={product.image || getPrimaryImageUrl(product)}
            type="product"
          />
          <StructuredData
            type="Product"
            data={{
              name: product.name,
              description: product.description || `Shop ${product.name} at Misqabbi.`,
              image: product.image || getPrimaryImageUrl(product),
              images: product.images,
              slug: product.slug,
              price: product.price,
              category: product.category,
              _id: product._id,
            }}
          />
        </>
      )}
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
                src={product.image || getPrimaryImageUrl(product)}
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
            {/* Custom Size Input - Compact inline design */}
            {supportsCustomSizing(product?.category) && (
              <div className="flex-1 pb-6">
                <CustomSizeInput
                  category={product?.category}
                  measurements={customMeasurements}
                  onMeasurementsChange={setCustomMeasurements}
                  onToggleCustomSize={setIsCustomSizeEnabled}
                  isCustomSizeEnabled={isCustomSizeEnabled}
                />
              </div>
            )}

            <div className="flex items-start gap-4 pb-6">
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
                className="bg-msq-purple-rich text-lg text-white rounded-md flex-grow max-w-[320px] cursor-pointer py-3 hover:bg-msq-purple transition-colors duration-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Buy Now Button - Full Width */}
            <div className="py-4">
              <button
                className="bg-msq-purple-rich text-lg text-white rounded-md w-full cursor-pointer py-3 hover:bg-msq-purple transition-colors duration-200"
                onClick={handleBuyNow}
              >
                Buy Now
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
