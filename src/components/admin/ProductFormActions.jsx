const ProductFormActions = ({ onCancel, onSave, isSubmitting, isEditing }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={isSubmitting}
        className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
          isSubmitting
            ? 'bg-msq-purple-rich/60 cursor-not-allowed'
            : 'bg-msq-purple-rich hover:bg-msq-purple-deep'
        }`}
      >
        {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
      </button>
    </div>
  );
};

export default ProductFormActions;
