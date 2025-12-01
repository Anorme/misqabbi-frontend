import { useState } from 'react';
import AdminModal from './AdminModal';
import FormField from './FormField';
import { showErrorToast } from '../../utils/showToast';

const VariantFormModal = ({
  isOpen,
  onClose,
  baseProduct,
  onSuccess,
  variantType: initialVariantType = 'color',
}) => {
  const [formData, setFormData] = useState({
    variantType: initialVariantType,
    swatchImage: null,
    images: null,
    stock: baseProduct?.stock?.toString() || '0',
    isPublished: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!formData.swatchImage || formData.swatchImage.length === 0) {
      showErrorToast('Swatch image is required');
      return;
    }

    if (!formData.variantType || !['color', 'print'].includes(formData.variantType)) {
      showErrorToast('Variant type must be either color or print');
      return;
    }

    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      showErrorToast('Stock must be a valid number (0 or greater)');
      return;
    }

    // Prepare FormData
    const submitData = new FormData();
    submitData.append('swatchImage', formData.swatchImage[0]);
    submitData.append('variantType', formData.variantType);
    submitData.append('name', baseProduct.name);
    submitData.append('description', baseProduct.description || '');
    submitData.append('price', baseProduct.price.toString());
    submitData.append('category', baseProduct.category);
    submitData.append('stock', formData.stock);
    submitData.append('isPublished', String(!!formData.isPublished));

    // Add gallery images (optional, max 5)
    if (formData.images && formData.images.length > 0) {
      const imagesToAdd = Array.from(formData.images).slice(0, 5);
      imagesToAdd.forEach(image => {
        submitData.append('images', image);
      });
    }

    setIsSubmitting(true);
    try {
      await onSuccess(submitData);
      // Reset form on success
      setFormData({
        variantType: initialVariantType,
        swatchImage: null,
        images: null,
        stock: baseProduct?.stock?.toString() || '0',
        isPublished: true,
      });
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Error submitting variant form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={baseProduct ? `Add Variant to ${baseProduct.name}` : 'Add Variant'}
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            label="Variant Type"
            type="select"
            value={formData.variantType}
            onChange={value => setFormData({ ...formData, variantType: value })}
            options={[
              { value: 'color', label: 'Color' },
              { value: 'print', label: 'Print' },
            ]}
            required
          />

          <FormField
            label="Swatch Image"
            type="file"
            value={formData.swatchImage}
            onChange={files => setFormData({ ...formData, swatchImage: files })}
            required
          />
          <p className="text-xs text-gray-500 -mt-2">
            This image will be used in the variant picker. Required.
          </p>

          <FormField
            label="Gallery Images (Optional, max 5)"
            type="file"
            value={formData.images}
            onChange={files => setFormData({ ...formData, images: files })}
          />
          <p className="text-xs text-gray-500 -mt-2">
            These images will be displayed in the product gallery when this variant is selected.
          </p>

          <FormField
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={value => setFormData({ ...formData, stock: value })}
            placeholder="0"
            required
          />

          <div className="flex items-center gap-2">
            <input
              id="isPublished"
              type="checkbox"
              checked={!!formData.isPublished}
              onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
              className="h-4 w-4 text-msq-purple-rich border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="text-sm text-gray-700">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isSubmitting
                  ? 'bg-msq-purple-rich/60 cursor-not-allowed'
                  : 'bg-msq-purple-rich hover:bg-msq-purple-deep'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Variant'}
            </button>
          </div>
        </div>
      </form>
    </AdminModal>
  );
};

export default VariantFormModal;
