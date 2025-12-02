import FormField from './FormField';
import { CATEGORIES } from '../../constants/categories';
import VariantManagementSection from './VariantManagementSection';
import ProductImageGallery from './ProductImageGallery';

const ProductForm = ({
  formData,
  onFormDataChange,
  editingProduct,
  onUpdateSwatchClick,
  onManageVariantsClick,
}) => {
  const updateField = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Product Name"
        value={formData.name}
        onChange={value => updateField('name', value)}
        placeholder="Enter product name"
        required
        sanitizeType="name"
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={value => updateField('description', value)}
        placeholder="Enter product description"
        rows={3}
        sanitizeType="description"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Price"
          type="number"
          value={formData.price}
          onChange={value => updateField('price', value)}
          placeholder="0.00"
          required
          sanitizeType="price"
        />

        <FormField
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={value => updateField('stock', value)}
          placeholder="0"
          required
        />
      </div>

      <FormField
        label="Category"
        type="select"
        value={formData.category}
        onChange={value => updateField('category', value)}
        options={CATEGORIES.filter(cat => cat.value !== '')}
        required
      />

      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          type="checkbox"
          checked={!!formData.isPublished}
          onChange={e => updateField('isPublished', e.target.checked)}
          className="h-4 w-4 text-msq-purple-rich border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      <FormField
        label="Swatch Image (Optional)"
        type="file"
        value={formData.swatchImage}
        onChange={files => updateField('swatchImage', files)}
      />
      <p className="text-xs text-gray-500 -mt-2 mb-2">
        A small preview image used for variant selection. Optional for base products.
      </p>

      {/* Existing Images - Only show when editing */}
      {editingProduct && formData.existingImages && formData.existingImages.length > 0 && (
        <ProductImageGallery images={formData.existingImages} />
      )}

      <FormField
        label="Product Images"
        type="file"
        value={formData.images}
        onChange={files => updateField('images', files)}
      />
      {editingProduct && (
        <p className="text-xs text-gray-500 -mt-2 mb-2">
          Upload new images to add to existing ones.
        </p>
      )}

      {/* Variant Management Section - Only show when editing */}
      {editingProduct && (
        <VariantManagementSection
          product={editingProduct}
          onUpdateSwatchClick={onUpdateSwatchClick}
          onManageVariantsClick={onManageVariantsClick}
        />
      )}
    </div>
  );
};

export default ProductForm;
