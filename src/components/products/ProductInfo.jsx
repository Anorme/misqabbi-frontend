import DOMPurify from 'dompurify';

function ProductInfo({ product }) {
  // Sanitize and render description as HTML
  const sanitizedDescription = product?.description
    ? DOMPurify.sanitize(product.description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
        ALLOWED_ATTR: [],
      })
    : '';

  return (
    <div className="flex flex-col gap-2 pb-4 sm:pb-6">
      <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-msq-purple">
        {product?.name}
      </h1>
      <p className="text-xl sm:text-2xl font-extrabold text-msq-purple-deep hidden lg:block">
        GHC {product?.price}
      </p>
      <h2 className="text-lg sm:text-xl lg:text-2xl">Details</h2>
      <div
        className="text-sm md:text-base leading-snug md:leading-normal"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
}

export default ProductInfo;
