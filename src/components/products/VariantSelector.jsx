import { getImageUrl } from '../../utils/productImages';

function VariantSelector({ baseProduct, variants = [], selectedVariant, onSelect }) {
  // Check if base product has a swatch image
  const hasBaseSwatch = baseProduct?.swatchImage && getImageUrl(baseProduct.swatchImage);

  // Get variant type from the first variant (all variants should have the same type)
  const variantType = variants[0]?.variantType || 'color';
  // Capitalize first letter for display
  const variantTypeTitle = variantType.charAt(0).toUpperCase() + variantType.slice(1);

  const handleBaseProductClick = () => {
    if (onSelect) {
      onSelect(null); // null means base product selected
    }
  };

  const handleVariantClick = variant => {
    if (onSelect) {
      onSelect(variant);
    }
  };

  // Check if base product is selected (selectedVariant is null)
  const isBaseSelected = selectedVariant === null;
  const swatchButtonBaseClasses =
    'relative w-12 h-12 sm:w-14 sm:h-14 rounded-none overflow-hidden border-2 bg-white transition-all duration-200';
  const selectedSwatchClasses = 'border-msq-gold-light ring-2 ring-msq-gold-light ring-offset-2';
  const unselectedSwatchClasses =
    'border-gray-300 hover:border-msq-gold-light hover:-translate-y-0.5';

  return (
    <div className="block w-full">
      <h2 className="text-base sm:text-lg lg:text-xl p-1 text-gray-900">{variantTypeTitle}</h2>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start">
        {/* Base Product Swatch - Show first if it exists */}
        {hasBaseSwatch && (
          <button
            onClick={handleBaseProductClick}
            className={`${swatchButtonBaseClasses} ${
              isBaseSelected ? selectedSwatchClasses : unselectedSwatchClasses
            }`}
            aria-label="Select base product"
            title="Base product"
          >
            <img
              src={getImageUrl(baseProduct.swatchImage)}
              alt="Base product swatch"
              className="w-full h-full object-cover"
            />
          </button>
        )}

        {/* Variant Swatches */}
        {variants.map(variant => {
          const isSelected = selectedVariant?._id === variant._id;
          const swatchUrl = getImageUrl(variant.swatchImage);

          return (
            <button
              key={variant._id}
              onClick={() => handleVariantClick(variant)}
              className={`${swatchButtonBaseClasses} ${
                isSelected ? selectedSwatchClasses : unselectedSwatchClasses
              }`}
              aria-label={`Select ${variant.variantType} variant`}
              title={`${variant.variantType} variant`}
            >
              {swatchUrl ? (
                <img
                  src={swatchUrl}
                  alt={`${variant.variantType} swatch`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">?</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;
