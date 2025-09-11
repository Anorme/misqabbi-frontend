import { MdArrowBackIos } from 'react-icons/md';
import { fetchProductById } from '../api/products';
import { useEffect, useState } from 'react';
import GalleryImages from '../components/ui/GalleryImages';

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

  console.log('Product Details:', product);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">No product found.</p>;

  return (
    <div className="font-lato p-4 bg-white">
      <header className="flex relative items-center justify-center">
        <div className="absolute left-2 cursor-pointer">
          <MdArrowBackIos />
        </div>
        <p className="lg:hidden">Product Details</p>
      </header>

      <main className="overflow-y-auto overflow-x-hidden scrollbar-hide text-start flex flex-col gap-2">
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
      </main>
    </div>
  );
}

export default ProductDetails;
