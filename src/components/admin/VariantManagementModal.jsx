import { useState } from 'react';
import AdminModal from './AdminModal';
import VariantFormModal from './VariantFormModal';
import { getImageUrl } from '../../utils/productImages';
import {
  useCreateVariant,
  useUpdateVariantSwatch,
  useDeleteVariant,
} from '../../hooks/mutations/useVariantMutations';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Edit2, Trash2, Plus, Upload } from 'lucide-react';

const VariantManagementModal = ({ isOpen, onClose, baseProduct, onEditVariant }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateSwatchModalOpen, setIsUpdateSwatchModalOpen] = useState(false);
  const [selectedVariantForUpdate, setSelectedVariantForUpdate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

  const createVariantMutation = useCreateVariant();
  const updateSwatchMutation = useUpdateVariantSwatch();
  const deleteVariantMutation = useDeleteVariant();

  // Get variants from base product (they should be populated)
  const variants = baseProduct?.variants || [];

  const handleCreateVariant = async formData => {
    try {
      await createVariantMutation.mutateAsync({
        baseProductId: baseProduct._id,
        formData,
      });
      showSuccessToast('Variant created successfully');
      setIsCreateModalOpen(false);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to create variant';
      showErrorToast(msg);
      throw error;
    }
  };

  const handleUpdateSwatch = async formData => {
    if (!selectedVariantForUpdate) return;

    try {
      await updateSwatchMutation.mutateAsync({
        baseProductId: baseProduct._id,
        variantId: selectedVariantForUpdate._id,
        formData,
      });
      showSuccessToast('Swatch image updated successfully');
      setIsUpdateSwatchModalOpen(false);
      setSelectedVariantForUpdate(null);
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || 'Failed to update swatch image';
      showErrorToast(msg);
      throw error;
    }
  };

  const handleDeleteVariant = async () => {
    if (!variantToDelete) return;

    try {
      await deleteVariantMutation.mutateAsync({
        baseProductId: baseProduct._id,
        variantId: variantToDelete._id,
      });
      showSuccessToast('Variant deleted successfully');
      setIsDeleteModalOpen(false);
      setVariantToDelete(null);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Failed to delete variant';
      showErrorToast(msg);
    }
  };

  const openUpdateSwatchModal = variant => {
    setSelectedVariantForUpdate(variant);
    setIsUpdateSwatchModalOpen(true);
  };

  const openDeleteModal = variant => {
    setVariantToDelete(variant);
    setIsDeleteModalOpen(true);
  };

  if (!isOpen || !baseProduct) return null;

  return (
    <>
      <AdminModal isOpen={isOpen} onClose={onClose} title={`Manage Variants - ${baseProduct.name}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {variants.length} variant{variants.length !== 1 ? 's' : ''} available
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-3 py-1.5 bg-msq-purple-rich text-white text-sm font-medium rounded-md hover:bg-msq-purple-deep transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Variant
            </button>
          </div>

          {variants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No variants yet. Click "Add Variant" to create one.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {variants.map(variant => {
                const swatchUrl = getImageUrl(variant.swatchImage);
                return (
                  <div
                    key={variant._id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {swatchUrl ? (
                        <img
                          src={swatchUrl}
                          alt={`${variant.variantType} swatch`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">?</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {variant.variantType}
                        </p>
                        <p className="text-xs text-gray-500">Stock: {variant.stock}</p>
                        <p className="text-xs text-gray-500">
                          {variant.isPublished ? 'Published' : 'Draft'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditVariant?.(variant, baseProduct)}
                        className="p-2 text-msq-purple-rich hover:bg-msq-purple-rich/10 rounded-md transition-colors"
                        title="Edit Variant"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openUpdateSwatchModal(variant)}
                        className="p-2 text-msq-purple-rich hover:bg-msq-purple-rich/10 rounded-md transition-colors"
                        title="Update Swatch Image"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(variant)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Variant"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </AdminModal>

      {/* Create Variant Modal */}
      <VariantFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        baseProduct={baseProduct}
        onSuccess={handleCreateVariant}
      />

      {/* Update Swatch Image Modal */}
      <AdminModal
        isOpen={isUpdateSwatchModalOpen}
        onClose={() => {
          setIsUpdateSwatchModalOpen(false);
          setSelectedVariantForUpdate(null);
        }}
        title="Update Swatch Image"
      >
        <form
          onSubmit={async e => {
            e.preventDefault();
            const fileInput = e.target.querySelector('input[type="file"]');
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
              showErrorToast('Please select a swatch image');
              return;
            }
            const formData = new FormData();
            formData.append('swatchImage', fileInput.files[0]);
            await handleUpdateSwatch(formData);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Swatch Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="swatchImage"
                accept="image/*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsUpdateSwatchModalOpen(false);
                  setSelectedVariantForUpdate(null);
                }}
                disabled={updateSwatchMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateSwatchMutation.isPending}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                  updateSwatchMutation.isPending
                    ? 'bg-msq-purple-rich/60 cursor-not-allowed'
                    : 'bg-msq-purple-rich hover:bg-msq-purple-deep'
                }`}
              >
                {updateSwatchMutation.isPending ? 'Updating...' : 'Update Swatch'}
              </button>
            </div>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!deleteVariantMutation.isPending) {
            setIsDeleteModalOpen(false);
            setVariantToDelete(null);
          }
        }}
        title="Delete Variant"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this {variantToDelete?.variantType} variant? This action
            cannot be undone and will delete all associated images.
          </p>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => {
                if (!deleteVariantMutation.isPending) {
                  setIsDeleteModalOpen(false);
                  setVariantToDelete(null);
                }
              }}
              disabled={deleteVariantMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteVariant}
              disabled={deleteVariantMutation.isPending}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                deleteVariantMutation.isPending
                  ? 'bg-red-600/70 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {deleteVariantMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </AdminModal>
    </>
  );
};

export default VariantManagementModal;
