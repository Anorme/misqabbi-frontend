import DOMPurify from 'dompurify';
import { formatCedis } from '../../utils/formatCurrency';

function ProductInfo({ product, price = product?.price, section = 'all' }) {
  const shouldRenderSummary = section === 'all' || section === 'summary';
  const shouldRenderDetails = section === 'all' || section === 'details';

  // Sanitize and render description as HTML
  const sanitizedDescription =
    shouldRenderDetails && product?.description
      ? DOMPurify.sanitize(product.description, {
          ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
          ALLOWED_ATTR: [],
        })
      : '';

  return (
    <div className="flex flex-col gap-2 pb-4 sm:pb-6">
      {shouldRenderSummary && (
        <>
          <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-msq-purple">
            {product?.name}
          </h1>
          <p className="text-lg sm:text-xl font-medium tracking-tight text-gray-700">
            {formatCedis(price)}
          </p>
        </>
      )}

      {shouldRenderDetails && (
        <>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-900">Details</h2>
          <div
            className="text-sm md:text-base leading-snug md:leading-normal product-description text-gray-900"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </>
      )}
    </div>
  );
}

export default ProductInfo;
