import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import { CATEGORIES } from '../../constants/categories';
import { getPrimaryImageUrl } from '../../utils/productImages';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import SlidingPane from '../../components/admin/SlidingPane';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { useAdminProducts } from '../../hooks/queries/useAdmin';
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUpdateProductSwatchImage,
} from '../../hooks/mutations/useProductMutations';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import VariantManagementModal from '../../components/admin/VariantManagementModal';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: null,
    swatchImage: null,
    isPublished: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [selectedProductForVariants, setSelectedProductForVariants] = useState(null);
  const [isUpdateSwatchModalOpen, setIsUpdateSwatchModalOpen] = useState(false);

  // Use TanStack Query for products fetching with caching
  const {
    data: productsData,
    isLoading: loading,
    isError,
    error: queryError,
  } = useAdminProducts({ page: currentPage, limit });

  // Filter out variant products - only show base products
  const allProducts = productsData?.data || [];
  const products = allProducts.filter(product => !product.isVariant);
  const totalPages = productsData?.totalPages || 1;
  const error = isError
    ? queryError?.response?.data?.message || queryError?.message || 'Failed to load products'
    : null;

  // Mutation hooks
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const updateSwatchMutation = useUpdateProductSwatchImage();

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (value, product) => (
        <div className="flex items-center">
          <img
            src={getPrimaryImageUrl(product, 'https://via.placeholder.com/40x40')}
            alt={value}
            className="h-10 w-10 rounded-md object-cover mr-3"
          />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: value => formatCurrency(value),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (value, product) => (
        <div className="flex flex-col gap-1">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              value < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {value}
          </span>
          {product.variants && product.variants.length > 0 && (
            <span className="text-xs text-gray-500">
              {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: value => new Date(value).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      component: ViewButton,
      onClick: product => handleViewProduct(product),
      title: 'View Product',
    },
    {
      component: EditButton,
      onClick: product => handleEditProduct(product),
      title: 'Edit Product',
    },
    {
      component: DeleteButton,
      onClick: product => openDeleteModal(product),
      title: 'Delete Product',
    },
  ];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      images: '',
      swatchImage: null,
      isPublished: false,
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      images: null, // Reset file input for editing
      swatchImage: null, // Reset file input for editing
      isPublished: Boolean(product.isPublished) || false,
    });
    // Set the product for variant management
    setSelectedProductForVariants(product);
    setIsModalOpen(true);
  };

  const handleViewProduct = product => {
    if (!product?.slug) {
      showErrorToast('Unable to view product: missing slug');
      return;
    }
    navigate(`/product/${product.slug}`);
  };

  const openDeleteModal = product => {
    setDeleteTarget(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteProductMutation.mutateAsync(deleteTarget._id);
      showSuccessToast('Product deleted successfully');
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to delete product';
      showErrorToast(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      showErrorToast('Please fill in all required fields');
      return;
    }

    // If creating a new product, call API with multipart/form-data
    if (!editingProduct) {
      try {
        setIsSubmitting(true);
        const body = new FormData();
        body.append('name', formData.name);
        body.append('description', formData.description || '');
        body.append('price', formData.price);
        body.append('category', formData.category);
        body.append('stock', formData.stock);
        body.append('isPublished', String(!!formData.isPublished));

        if (formData.swatchImage && formData.swatchImage.length > 0) {
          body.append('swatchImage', formData.swatchImage[0]);
        }

        if (formData.images && formData.images.length > 0) {
          Array.from(formData.images).forEach(file => {
            body.append('images', file);
          });
        }

        const res = await createProductMutation.mutateAsync(body);
        showSuccessToast(res?.message || 'Product added successfully');
        setIsModalOpen(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          images: null,
          swatchImage: null,
          isPublished: false,
        });
        return;
      } catch (e) {
        const msg = e?.response?.data?.message || e?.message || 'Failed to create product';
        showErrorToast(msg);
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    // Below: update flow via API for editing
    try {
      setIsSubmitting(true);
      let payload;
      const hasNewImages = formData.images && formData.images.length > 0;
      const hasNewSwatchImage = formData.swatchImage && formData.swatchImage.length > 0;
      if (hasNewImages || hasNewSwatchImage) {
        const body = new FormData();
        body.append('name', formData.name);
        body.append('description', formData.description || '');
        body.append('price', formData.price);
        body.append('category', formData.category);
        body.append('stock', formData.stock);
        body.append('isPublished', String(!!formData.isPublished));

        if (hasNewSwatchImage) {
          body.append('swatchImage', formData.swatchImage[0]);
        }

        if (hasNewImages) {
          Array.from(formData.images).forEach(file => body.append('images', file));
        }
        payload = body;
      } else {
        payload = {
          name: formData.name,
          description: formData.description || '',
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
          isPublished: !!formData.isPublished,
        };
      }

      const res = await updateProductMutation.mutateAsync({
        id: editingProduct._id,
        body: payload,
      });
      showSuccessToast(res?.message || 'Product updated successfully');
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to update product';
      showErrorToast(msg);
      return;
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: null,
        isPublished: false,
      });
      // Clear variant management product when closing edit modal
      setSelectedProductForVariants(null);
      setEditingProduct(null);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products Management"
        actionLabel="Add Product"
        onAction={handleAddProduct}
      />

      {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

      {loading ? (
        <div className="py-10 flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={products} actions={actions} />
          {!error && products.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-6">No products found.</div>
          )}
        </>
      )}

      {totalPages > 1 && (
        <PaginationLocal
          page={currentPage}
          totalPages={totalPages}
          onPrev={() => handlePageChange(currentPage - 1)}
          onNext={() => handlePageChange(currentPage + 1)}
        />
      )}

      <SlidingPane
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProductForVariants(null);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-6">
          <FormField
            label="Product Name"
            value={formData.name}
            onChange={value => setFormData({ ...formData, name: value })}
            placeholder="Enter product name"
            required
            sanitizeType="name"
          />

          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={value => setFormData({ ...formData, description: value })}
            placeholder="Enter product description"
            rows={3}
            sanitizeType="description"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Price"
              type="number"
              value={formData.price}
              onChange={value => setFormData({ ...formData, price: value })}
              placeholder="0.00"
              required
              sanitizeType="price"
            />

            <FormField
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={value => setFormData({ ...formData, stock: value })}
              placeholder="0"
              required
            />
          </div>

          <FormField
            label="Category"
            type="select"
            value={formData.category}
            onChange={value => setFormData({ ...formData, category: value })}
            options={CATEGORIES.filter(cat => cat.value !== '')}
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

          <FormField
            label="Swatch Image (Optional)"
            type="file"
            value={formData.swatchImage}
            onChange={files => setFormData({ ...formData, swatchImage: files })}
          />
          <p className="text-xs text-gray-500 -mt-2 mb-2">
            A small preview image used for variant selection. Optional for base products.
          </p>

          <FormField
            label="Product Images"
            type="file"
            value={formData.images}
            onChange={files => setFormData({ ...formData, images: files })}
          />

          {/* Variant Management Section - Only show when editing */}
          {editingProduct && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Product Variants</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateSwatchModalOpen(true)}
                    className="inline-flex items-center px-3 py-1.5 bg-msq-gold-light text-white text-sm font-medium rounded-md hover:bg-msq-gold transition-colors"
                  >
                    Update Swatch
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVariantModalOpen(true)}
                    className="inline-flex items-center px-3 py-1.5 bg-msq-purple-rich text-white text-sm font-medium rounded-md hover:bg-msq-purple-deep transition-colors"
                  >
                    Manage Variants
                  </button>
                </div>
              </div>
              {editingProduct.variants && editingProduct.variants.length > 0 ? (
                <p className="text-xs text-gray-500">
                  {editingProduct.variants.length} variant
                  {editingProduct.variants.length !== 1 ? 's' : ''} available
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  No variants yet. Click "Manage Variants" to add one.
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isSubmitting
                  ? 'bg-msq-purple-rich/60 cursor-not-allowed'
                  : 'bg-msq-purple-rich hover:bg-msq-purple-deep'
              }`}
            >
              {isSubmitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </SlidingPane>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteModalOpen(false);
            setDeleteTarget(null);
          }
        }}
        title="Delete Product"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete
            <span className="font-medium text-gray-900"> {deleteTarget?.name}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => {
                if (!isDeleting) {
                  setIsDeleteModalOpen(false);
                  setDeleteTarget(null);
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
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

      {/* Variant Management Modal */}
      <VariantManagementModal
        isOpen={isVariantModalOpen}
        onClose={() => {
          setIsVariantModalOpen(false);
          // Don't clear selectedProductForVariants here - keep it for the edit modal
        }}
        baseProduct={selectedProductForVariants || editingProduct}
      />

      {/* Update Swatch Image Modal */}
      <AdminModal
        isOpen={isUpdateSwatchModalOpen}
        onClose={() => {
          if (!updateSwatchMutation.isPending) {
            setIsUpdateSwatchModalOpen(false);
          }
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
            try {
              const formData = new FormData();
              formData.append('swatchImage', fileInput.files[0]);
              await updateSwatchMutation.mutateAsync({
                productId: editingProduct._id,
                formData,
              });
              showSuccessToast('Swatch image updated successfully');
              setIsUpdateSwatchModalOpen(false);
            } catch (error) {
              const msg =
                error?.response?.data?.message || error?.message || 'Failed to update swatch image';
              showErrorToast(msg);
            }
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
              <p className="text-xs text-gray-500 mt-1">
                This image will be used for variant selection. The old swatch image will be
                replaced.
              </p>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!updateSwatchMutation.isPending) {
                    setIsUpdateSwatchModalOpen(false);
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
    </div>
  );
};

export default AdminProducts;
