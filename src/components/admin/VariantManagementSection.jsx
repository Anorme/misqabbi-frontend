const VariantManagementSection = ({ product, onUpdateSwatchClick, onManageVariantsClick }) => {
  const variantCount = product?.variants?.length || 0;

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Product Variants</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onUpdateSwatchClick}
            className="inline-flex items-center px-3 py-1.5 bg-msq-gold-light text-white text-sm font-medium rounded-md hover:bg-msq-gold transition-colors"
          >
            Update Swatch
          </button>
          <button
            type="button"
            onClick={onManageVariantsClick}
            className="inline-flex items-center px-3 py-1.5 bg-msq-purple-rich text-white text-sm font-medium rounded-md hover:bg-msq-purple-deep transition-colors"
          >
            Manage Variants
          </button>
        </div>
      </div>
      {variantCount > 0 ? (
        <p className="text-xs text-gray-500">
          {variantCount} variant{variantCount !== 1 ? 's' : ''} available
        </p>
      ) : (
        <p className="text-xs text-gray-500">
          No variants yet. Click "Manage Variants" to add one.
        </p>
      )}
    </div>
  );
};

export default VariantManagementSection;
