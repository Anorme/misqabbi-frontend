import { useEffect, useState, lazy, Suspense } from 'react';
import { addToCart } from '../contexts/cart/cartActions';
import { useCartDispatch } from '../contexts/cart/useCart';

import { useParams, useNavigate } from 'react-router';

import { useProduct } from '../hooks/queries/useProducts';

const SizeSelect = lazy(() => import('../components/products/SizeSelect'));
const ProductInfo = lazy(() => import('../components/products/ProductInfo'));
const GalleryImages = lazy(() => import('../components/products/GalleryImages'));
const QuantitySelector = lazy(() => import('../components/products/QuantitySelector'));
const VariantSelector = lazy(() => import('../components/products/VariantSelector'));
import ProductSection from '../components/products/ProductSection';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import ProductCard from '../components/products/ProductCard';
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
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { requireAuth, closeModal, isModalOpen, modalContext } = useAuthAction();

  // Use TanStack Query for product fetching with caching
  const { data: product, isLoading: loading, isError, error: queryError } = useProduct(slug);

  // Extract related products from the product data
  const relatedProducts = product?.relatedProducts || [];

  // Get the active product (variant if selected, otherwise base product)
  const activeProduct = selectedVariant || product;

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
      id: activeProduct._id,
      name: activeProduct.name,
      price: activeProduct.price,
      images: activeProduct.images || product.images,
      slug: activeProduct.slug || product.slug,
      size: isCustomSizeEnabled ? 'CUSTOM' : selectedSize,
      quantity: selectedQuantity,
      category: activeProduct?.category ?? product?.category ?? '',
    };

    // Add custom measurements if enabled
    if (isCustomSizeEnabled) {
      cartItem.customSize = customMeasurements;
    }

    cartDispatch(addToCart(cartItem));
    showAddedToCartToast();
  };

  const handleBuyNow = () => {
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
      id: activeProduct._id,
      name: activeProduct.name,
      price: activeProduct.price,
      images: activeProduct.images || product.images,
      slug: activeProduct.slug || product.slug,
      size: isCustomSizeEnabled ? 'CUSTOM' : selectedSize,
      quantity: selectedQuantity,
      category: activeProduct?.category ?? product?.category ?? '',
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

  // Reset selected image index and variant when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedVariant(null);
    }
  }, [product]);

  // Handle variant selection
  const handleVariantSelect = variant => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Reset to first image when variant changes
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
    <div className="font-lato px-3 sm:px-4 py-0 lg:py-8 bg-white">
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
      <main className="text-start flex flex-col gap-2">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-0 items-start">
          {/* Images Section */}
          <div className="-mx-3 flex flex-col gap-3 sm:-mx-4 sm:gap-4 lg:mx-0 lg:gap-5">
            {/* Image Gallery */}
            <Suspense fallback={null}>
              <GalleryImages
                product={activeProduct || product}
                selectedIndex={selectedImageIndex}
                onImageSelect={setSelectedImageIndex}
                favoriteProduct={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  images: product.images,
                  slug: product.slug,
                }}
                onFavoriteAuthRequired={handleFavoriteClick}
              />
            </Suspense>
          </div>

          {/* Product Info Section */}
          <div className="divide-y-2 divide-gray-300 lg:pt-4">
            <Suspense fallback={null}>
              <ProductInfo product={product} price={activeProduct?.price} section="summary" />
            </Suspense>

            {/* Variant Selector */}
            {(product?.swatchImage && getImageUrl(product.swatchImage)) ||
            (product?.variants && product.variants.length > 0) ? (
              <ProductSection>
                <Suspense fallback={null}>
                  <VariantSelector
                    baseProduct={product}
                    variants={product?.variants || []}
                    selectedVariant={selectedVariant}
                    onSelect={handleVariantSelect}
                  />
                </Suspense>
              </ProductSection>
            ) : null}

            {/* Quantity Selector */}
            <ProductSection>
              <Suspense fallback={null}>
                <QuantitySelector quantity={selectedQuantity} onChange={setSelectedQuantity} />
              </Suspense>
            </ProductSection>

            {/* Size Selector */}
            <ProductSection>
              <Suspense fallback={null}>
                <SizeSelect
                  selected={selectedSize}
                  onChange={setSelectedSize}
                  category={product?.category}
                  customMeasurements={customMeasurements}
                  onCustomMeasurementsChange={setCustomMeasurements}
                  onToggleCustomSize={setIsCustomSizeEnabled}
                  isCustomSizeEnabled={isCustomSizeEnabled}
                  supportsCustomSizing={supportsCustomSizing(product?.category)}
                />
              </Suspense>
            </ProductSection>

            {/* Add to Cart CTA */}
            <ProductSection>
              <div className="flex justify-between">
                <button
                  className="bg-msq-purple-rich text-xs sm:text-sm md:text-base lg:text-lg text-white rounded-md w-full cursor-pointer py-2 sm:py-3 hover:bg-msq-purple transition-colors duration-200"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </ProductSection>

            {/* Buy Now Button*/}
            <ProductSection>
              <button
                className="bg-msq-purple-rich font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white rounded-md w-full cursor-pointer py-4 hover:bg-msq-purple transition-colors duration-200"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </ProductSection>

            {/* Product Details */}
            <ProductSection>
              <Suspense fallback={null}>
                <ProductInfo product={product} section="details" />
              </Suspense>
            </ProductSection>
          </div>
        </div>

        {/* Related Products Section */}
        {!loading && relatedProducts && relatedProducts.length > 0 && (
          <div className="w-full mx-auto mt-8 sm:mt-12 lg:mt-16 py-4 sm:py-6">
            <h2 className="text-msq-purple-deep font-lato text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 lg:mb-8">
              Related Products
            </h2>
            <div
              className={
                relatedProducts.length < 4
                  ? // Center cards when less than 4 products with fixed widths
                    'flex flex-wrap justify-center gap-4 sm:gap-6'
                  : // Grid layout for 4 products
                    'grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'
              }
            >
              {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct._id}
                  className={
                    relatedProducts.length < 4
                      ? // Fixed widths at various breakpoints to prevent excessive shrinking and ensure full card display
                        'w-[160px] sm:w-[180px] md:w-[350px] lg:w-[360px] xl:w-[450px] max-w-full flex-shrink-0'
                      : // Full width for grid items
                        'w-full'
                  }
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <AuthActionModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
    </div>
  );
}

export default ProductDetails;
