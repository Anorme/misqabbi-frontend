import { useEffect, useState, lazy, Suspense } from 'react';
import { addToCart } from '../contexts/cart/cartActions';
import { useCartDispatch } from '../contexts/cart/useCart';

import { useParams, useNavigate } from 'react-router';
import BackButton from '../components/layout/BackButton';

import { useProduct } from '../hooks/queries/useProducts';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const SizeSelect = lazy(() => import('../components/products/SizeSelect'));
const ProductInfo = lazy(() => import('../components/products/ProductInfo'));
const GalleryImages = lazy(() => import('../components/products/GalleryImages'));
const QuantitySelector = lazy(() => import('../components/products/QuantitySelector'));
const CustomSizeInput = lazy(() => import('../components/products/CustomSizeInput'));
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
import { getPrimaryImageUrl, getImageUrl } from '../utils/productImages';

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cartDispatch = useCartDispatch();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCustomSizeEnabled, setIsCustomSizeEnabled] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const EPS = 0.05;

  // Use TanStack Query for product fetching with caching
  const { data: product, isLoading: loading, isError, error: queryError } = useProduct(slug);

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

  // Scroll to top when loading completes (new results loaded)
  useEffect(() => {
    if (!loading && product) {
      scrollToTop();
    }
  }, [loading, product]);

  // Reset selected image index when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
    }
  }, [product]);

  // Get the currently selected image
  const getSelectedImageUrl = () => {
    const productImages = product?.images || [];
    if (productImages.length > 0 && selectedImageIndex < productImages.length) {
      return getImageUrl(productImages[selectedImageIndex]);
    }
    // Fallback to product.image or primary image
    return product?.image || getPrimaryImageUrl(product);
  };

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <LoadingSpinner size={80} color="#cfb484" />
      </div>
    );
  if (isError)
    return (
      <p className="p-4 text-red-500">
        {queryError?.message || 'Something went wrong while loading the product.'}
      </p>
    );
  if (!product) return <p className="p-4">No product found.</p>;

  return (
    <div className="font-lato px-3 sm:px-4 py-4 lg:py-8 bg-white">
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
      <header className="flex relative items-center justify-center md:mt-8">
        <BackButton />
      </header>

      <main className="text-start flex flex-col gap-2">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-4 sm:py-6 items-start">
          {/* Images Section */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <TransformWrapper
                key={selectedImageIndex}
                initialScale={1}
                minScale={1}
                maxScale={3}
                doubleClick={{ disabled: false, mode: 'toggle' }}
                panning={{ disabled: !isImageZoomed }}
                wheel={{ disabled: true }}
                pinch={{ step: 5 }}
                centerOnInit={true}
                onPinchingStart={() => setIsImageZoomed(true)}
                onPinchingStop={({ state }) => setIsImageZoomed(state.scale > 1 + EPS)}
                onZoomStop={({ state }) => setIsImageZoomed(state.scale > 1 + EPS)}
              >
                <TransformComponent wrapperClass="!w-full !h-full flex items-center justify-center">
                  <img
                    className="aspect-[4/5] w-full object-cover rounded-none cursor-zoom-in"
                    src={getSelectedImageUrl()}
                    alt={product?.name}
                  />
                </TransformComponent>
              </TransformWrapper>
              <div className="absolute top-3 right-3 z-10">
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
            <Suspense fallback={null}>
              <GalleryImages
                product={product}
                selectedIndex={selectedImageIndex}
                onImageSelect={setSelectedImageIndex}
              />
            </Suspense>
          </div>

          {/* Product Info Section */}
          <div className="divide-y-2 divide-gray-300 lg:pt-4">
            <Suspense fallback={null}>
              <ProductInfo product={product}></ProductInfo>
            </Suspense>

            <Suspense fallback={null}>
              <SizeSelect selected={selectedSize} onChange={setSelectedSize}></SizeSelect>
            </Suspense>
            {/* Custom Size Input - Compact inline design */}
            {supportsCustomSizing(product?.category) && (
              <div className="flex-1 pb-6">
                <Suspense fallback={null}>
                  <CustomSizeInput
                    category={product?.category}
                    measurements={customMeasurements}
                    onMeasurementsChange={setCustomMeasurements}
                    onToggleCustomSize={setIsCustomSizeEnabled}
                    isCustomSizeEnabled={isCustomSizeEnabled}
                  />
                </Suspense>
              </div>
            )}

            <div className="flex items-start gap-4 pb-4 sm:pb-6">
              <Suspense fallback={null}>
                <QuantitySelector quantity={selectedQuantity} onChange={setSelectedQuantity} />
              </Suspense>
            </div>

            {/* Product price and CTA */}
            <div className="flex py-4 sm:py-6 space-x-3 sm:space-x-5 justify-between">
              <div className="w-1/2 px-2 sm:px-3 py-2 bg-[#EEE5E5] rounded-md flex flex-col max-w-[190px]">
                <p className="text-xs sm:text-sm text-[#B1B2B2]">Total price:</p>
                <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-extrabold text-msq-purple-deep">
                  GHC {(product?.price * selectedQuantity).toFixed(2)}
                </h1>
              </div>
              <button
                className="bg-msq-purple-rich text-xs sm:text-sm md:text-base lg:text-lg text-white rounded-md flex-grow max-w-[320px] cursor-pointer py-2 sm:py-3 hover:bg-msq-purple transition-colors duration-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Buy Now Button*/}
            <div className="py-3 sm:py-4">
              <button
                className="bg-msq-purple-rich font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white rounded-md w-full cursor-pointer h-[52px] py-2 sm:py-3 hover:bg-msq-purple transition-colors duration-200"
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
