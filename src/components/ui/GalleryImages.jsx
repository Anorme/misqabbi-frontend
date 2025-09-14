function GalleryImages({ product }) {
  const galleryImages = Array(5).fill(product?.images[0] || product?.images);

  return (
    <>
      <ul className="grid grid-cols-5 gap-4 h-28 w-4/5 mx-auto overflow-hidden ">
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
    </>
  );
}

export default GalleryImages;
