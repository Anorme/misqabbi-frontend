import { MdArrowBackIos } from 'react-icons/md';
import { fetchProductById } from '../api/products';
import { useEffect, useState } from 'react';
import GalleryImages from '../components/ui/GalleryImages';
import SizeSelect from '../components/ui/SizeSelect';
import QuantitySelector from '../components/ui/QuantitySelector';
import ColorPalette from '../components/ui/ColorPalette';
import ProductInfo from '../components/ui/ProductInfo';

const PRODUCT_ID = '68a3d39ee837aef0596710e3'; // Example product ID

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(PRODUCT_ID);
        setProduct(response);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Something went wrong while loading the product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  function handleSizeSelect(size) {
    console.log('Selected size:', size);
  }

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">No product found.</p>;

  return (
    <div className="font-lato px-4 py-4 lg:py-8 bg-white">
      <header className="flex relative items-center justify-center">
        <div className="absolute left-2 lg:text-2xl cursor-pointer">
          <MdArrowBackIos />
        </div>
        <p className="lg:hidden">Product Details</p>
      </header>

      <main className="overflow-y-auto overflow-x-hidden scrollbar-hide text-start flex flex-col gap-2">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 gap-5 py-6">
          {/* Images Section */}
          <div className="flex flex-col gap-5">
            <div>
              <img
                className="h-[25.75rem] lg:h-[40.125rem] w-full object-cover rounded-md"
                src={product.image || product.images[0]}
                alt={product?.name}
              />
            </div>

            {/* Image Gallery */}
            <GalleryImages product={product}></GalleryImages>
          </div>

          {/* Product Info Section */}
          <div className="divide-y-2 divide-gray-300 max-w-[534px] lg:pt-4">
            <ProductInfo product={product}></ProductInfo>

            <SizeSelect onChange={handleSizeSelect}></SizeSelect>

            <div className="flex justify-between pb-6">
              <QuantitySelector />
            </div>

            {/* Product price and CTA */}
            <div className="flex py-6 space-x-5 justify-between">
              <div className="w-1/2 px-3 py-2 bg-[#EEE5E5] rounded-md flex flex-col max-w-[190px]">
                <p className="text-sm text-[#B1B2B2]">Total price:</p>
                <h1 className="text-2xl font-extrabold text-msq-purple-deep">
                  GHC {product?.price}
                </h1>
              </div>
              <button className="bg-msq-purple-rich text-lg text-white rounded-md flex-grow max-w-[320px] cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
