import { MdArrowBackIos } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/api';
import SizeSelect from '../components/UI/SizeSelect';
import ColorPalette from '../components/UI/ColorPalette';
import QuantitySelector from '../components/UI/QuantitySelector';

const PRODUCT_ID = '68a3d39ee837aef0596710e3'; // Example product ID

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(PRODUCT_ID);
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

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">No product found.</p>;

  // Build a fake gallery array (duplicates of the single API image)
  const galleryImages = Array(5).fill(product.image || product.images);

  return (
    <div className="font-lato p-4 bg-white">
      <header className="flex relative items-center justify-center">
        <div className="absolute left-2 cursor-pointer">
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
                src={product.image || product.images}
                alt={product?.name}
              />
            </div>

            <ul className="grid grid-cols-5 gap-4 h-28">
              {galleryImages.map((img, idx) => (
                <li key={idx}>
                  <img
                    src={img}
                    alt={`${product?.name} thumbnail ${idx + 1}`}
                    className="object-cover h-full w-full rounded"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Product Info */}
          <div className="divide-y-2 divide-gray-300 max-w-[534px]">
            <div className="flex flex-col gap-2 pb-6">
              <h1 className="font-extrabold text-2xl tracking-normal text-purple-500">
                {product?.name}
              </h1>
              <h2 className="text-2xl">Details</h2>
              <p>{product?.description}</p>
            </div>

            <SizeSelect />

            <div className="flex justify-between pb-6">
              <QuantitySelector />
              <ColorPalette />
            </div>

            <div className="flex py-6">
              <div className="w-1/2 px-3 py-2 bg-[#EEE5E5] rounded-lg flex flex-col">
                <p className="text-sm text-[#B1B2B2]">Total price:</p>
                <h1 className="text-2xl font-extrabold text-purple-700">GHC {product?.price}</h1>
              </div>
              <button className="bg-purple-500 text-lg text-white rounded-lg flex-grow">
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
