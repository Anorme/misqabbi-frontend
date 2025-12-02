import AdminModal from './AdminModal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const UpdateSwatchModal = ({ isOpen, onClose, product, updateSwatchMutation }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      showErrorToast('Please select a swatch image');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('swatchImage', fileInput.files[0]);
      await updateSwatchMutation.mutateAsync({
        productId: product._id,
        formData,
      });
      showSuccessToast('Swatch image updated successfully');
      onClose();
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || 'Failed to update swatch image';
      showErrorToast(msg);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={() => {
        if (!updateSwatchMutation.isPending) {
          onClose();
        }
      }}
      title="Update Swatch Image"
    >
      <form onSubmit={handleSubmit}>
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
            <p className="text-xs text-gray-500 mt-1">
              This image will be used for variant selection. The old swatch image will be replaced.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                if (!updateSwatchMutation.isPending) {
                  onClose();
                }
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
  );
};

export default UpdateSwatchModal;
