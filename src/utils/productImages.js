/**
 * Helper utilities for handling product images in both old and new formats.
 * Old format: images: string[]
 * New format: images: [{ url: string, publicId: string }]
 */

/**
 * Gets the URL from an image, supporting both string and object formats
 * @param {string | { url: string, publicId: string } | null | undefined} image
 * @returns {string} The image URL or empty string
 */
export const getImageUrl = image => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image.url) return image.url;
  return '';
};

/**
 * Gets the primary (first) image URL from a product's images array
 * @param {{ images?: (string | { url: string, publicId: string })[] }} product
 * @param {string} placeholder - Fallback URL if no images exist
 * @returns {string} The first image URL or placeholder
 */
export const getPrimaryImageUrl = (product, placeholder = 'https://via.placeholder.com/150') => {
  if (!product?.images || !Array.isArray(product.images) || product.images.length === 0) {
    return placeholder;
  }
  const firstImage = product.images[0];
  const url = getImageUrl(firstImage);
  return url || placeholder;
};
