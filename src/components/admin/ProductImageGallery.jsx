import { getImageUrl } from '../../utils/productImages';
import CloseButton from '../ui/CloseButton';

const ProductImageGallery = ({ images = [], onDeleteImage }) => {
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

          // Get publicId from image object (could be string or object with publicId)
          const publicId = typeof image === 'object' && image.publicId ? image.publicId : null;

          return (
            <div key={index} className="relative group aspect-square">
              <img
                src={imageUrl}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover rounded-md border border-gray-200"
              />
              {onDeleteImage && publicId && (
                <div className="absolute top-1 right-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <CloseButton
                    onClose={() => onDeleteImage(publicId)}
                    size={16}
                    className="bg-white rounded-full"
                    ariaLabel={`Delete image ${index + 1}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageGallery;
