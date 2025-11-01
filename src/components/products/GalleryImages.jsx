import { getImageUrl } from '../../utils/productImages';

function GalleryImages({ product }) {
  const galleryImages = product?.images || [];

  return (
    <>
      <ul className="grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4 h-20 sm:h-24 lg:h-28 px-2 sm:px-3 lg:px-4 mx-auto">
        {galleryImages.map((img, idx) => (
          <li key={idx}>
            <img
              src={getImageUrl(img)}
              alt={`${product?.name} thumbnail ${idx + 1}`}
              className="object-cover h-full w-full rounded-none"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default GalleryImages;
