import { getImageUrl } from '../../utils/productImages';

const ProductImageGallery = ({ images = [] }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Existing Images</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((image, index) => {
          const imageUrl = getImageUrl(image);
          if (!imageUrl) return null;

          return (
            <div key={index} className="aspect-square">
              <img
                src={imageUrl}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover rounded-md border border-gray-200"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageGallery;
