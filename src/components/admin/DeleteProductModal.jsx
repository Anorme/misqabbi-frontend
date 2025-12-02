import AdminModal from './AdminModal';

const DeleteProductModal = ({ isOpen, onClose, product, onConfirm, isDeleting }) => {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={() => {
        if (!isDeleting) {
          onClose();
        }
      }}
      title="Delete Product"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete
          <span className="font-medium text-gray-900"> {product?.name}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={() => {
              if (!isDeleting) {
                onClose();
              }
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
              isDeleting ? 'bg-red-600/70 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default DeleteProductModal;
