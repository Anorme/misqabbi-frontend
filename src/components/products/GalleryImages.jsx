import { getImageUrl } from '../../utils/productImages';

function GalleryImages({ product, selectedIndex = 0, onImageSelect }) {
  const galleryImages = product?.images || [];

  if (galleryImages.length === 0) {
    return null;
  }

  const handleThumbnailClick = idx => {
    if (onImageSelect) {
      onImageSelect(idx);
    }
  };

  return (
    <>
      <ul className="grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4 h-full px-2 sm:px-3 lg:px-4 w-full">
        {galleryImages.map((img, idx) => (
          <li
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedIndex === idx
                ? 'ring-2 ring-msq-purple-rich ring-offset-2'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={getImageUrl(img)}
              alt={`${product?.name} thumbnail ${idx + 1}`}
              loading="lazy"
              decoding="async"
              className="object-cover h-full w-full rounded-none"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default GalleryImages;
