function GalleryImages({ product }) {
  const galleryImages = product?.images || [];

  return (
    <>
      <ul className="grid grid-cols-5 gap-4 h-28 px-4 mx-auto">
        {galleryImages.map((img, idx) => (
          <li key={idx}>
            <img
              src={img}
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
