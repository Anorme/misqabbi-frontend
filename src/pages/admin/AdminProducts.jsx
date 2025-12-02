import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import { getPrimaryImageUrl } from '../../utils/productImages';
import DataTable from '../../components/admin/DataTable';
import SlidingPane from '../../components/admin/SlidingPane';
import ProductForm from '../../components/admin/ProductForm';
import ProductFormActions from '../../components/admin/ProductFormActions';
import DeleteProductModal from '../../components/admin/DeleteProductModal';
import UpdateSwatchModal from '../../components/admin/UpdateSwatchModal';
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
  useDeleteProductImage,
  useDeleteVariantImage,
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
  const [baseProductForVariant, setBaseProductForVariant] = useState(null);

  // Use TanStack Query for products fetching with caching
  const {
    data: productsData,
    isLoading: loading,
    isError,
    error: queryError,
  } = useAdminProducts({ page: currentPage, limit });

  // Filter out variant products - only show base products
  const products = productsData?.data || [];

  const totalPages = productsData?.totalPages || 1;
  const error = isError
    ? queryError?.response?.data?.message || queryError?.message || 'Failed to load products'
    : null;

  // Mutation hooks
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const updateSwatchMutation = useUpdateProductSwatchImage();
  const deleteImageMutation = useDeleteProductImage();
  const deleteVariantImageMutation = useDeleteVariantImage();

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

  const handleEditProduct = (product, isVariant = false, baseProduct = null) => {
    if (isVariant) {
      // Editing a variant
      setEditingProduct(product);
      setBaseProductForVariant(baseProduct);
      setFormData({
        stock: product.stock.toString(),
        images: null, // Reset file input for editing
        swatchImage: null, // Reset file input for editing
        isPublished: Boolean(product.isPublished) || false,
        // Variants inherit name, description, price, category from base
        name: baseProduct.name,
        description: baseProduct.description,
        price: baseProduct.price.toString(),
        category: baseProduct.category,
      });
      setSelectedProductForVariants(baseProduct);
    } else {
      // Editing base product (existing logic)
      setEditingProduct(product);
      setBaseProductForVariant(null);
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
    }
    setIsModalOpen(true);
  };

  const handleEditVariant = (variant, baseProduct) => {
    setIsVariantModalOpen(false); // Close variant modal
    handleEditProduct(variant, true, baseProduct);
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
      const isVariant = baseProductForVariant !== null;
      const productId = editingProduct._id; // Works for both base products and variants
      let payload;
      const hasNewImages = formData.images && formData.images.length > 0;
      const hasNewSwatchImage = formData.swatchImage && formData.swatchImage.length > 0;

      if (hasNewImages || hasNewSwatchImage) {
        const body = new FormData();
        // For variants, only send fields that can be updated
        if (isVariant) {
          body.append('stock', formData.stock);
          body.append('isPublished', String(!!formData.isPublished));
        } else {
          body.append('name', formData.name);
          body.append('description', formData.description || '');
          body.append('price', formData.price);
          body.append('category', formData.category);
          body.append('stock', formData.stock);
          body.append('isPublished', String(!!formData.isPublished));
        }

        if (hasNewSwatchImage) {
          body.append('swatchImage', formData.swatchImage[0]);
        }

        if (hasNewImages) {
          Array.from(formData.images).forEach(file => body.append('images', file));
        }
        payload = body;
      } else {
        // No new images - JSON payload
        if (isVariant) {
          payload = {
            stock: formData.stock,
            isPublished: !!formData.isPublished,
          };
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
      }

      const res = await updateProductMutation.mutateAsync({
        id: productId, // Works for both base products and variants
        body: payload,
      });
      showSuccessToast(
        res?.message ||
          (isVariant ? 'Variant updated successfully' : 'Product updated successfully')
      );
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
      setBaseProductForVariant(null); // Clear variant tracking
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleDeleteImage = async publicId => {
    if (!editingProduct?._id) {
      showErrorToast('No product selected for editing');
      return;
    }

    const isVariant = baseProductForVariant !== null;

    try {
      let result;
      if (isVariant) {
        // Use variant deletion endpoint
        result = await deleteVariantImageMutation.mutateAsync({
          baseProductId: baseProductForVariant._id,
          variantId: editingProduct._id,
          publicId,
        });
      } else {
        // Use base product deletion endpoint
        result = await deleteImageMutation.mutateAsync({
          productId: editingProduct._id,
          publicId,
        });
      }

      if (result?.data) {
        // Update the editingProduct with the updated product data from the response
        setEditingProduct(result.data);
        showSuccessToast('Image deleted successfully');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to delete image';
      showErrorToast(errorMessage);
    }
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
          setBaseProductForVariant(null);
        }}
        title={
          baseProductForVariant
            ? `Edit Variant - ${editingProduct?.variantType ? editingProduct.variantType.charAt(0).toUpperCase() + editingProduct.variantType.slice(1) : 'Variant'}`
            : editingProduct
              ? 'Edit Product'
              : 'Add New Product'
        }
      >
        <ProductForm
          formData={formData}
          onFormDataChange={setFormData}
          editingProduct={editingProduct}
          onUpdateSwatchClick={() => setIsUpdateSwatchModalOpen(true)}
          onManageVariantsClick={() => setIsVariantModalOpen(true)}
          onDeleteImage={handleDeleteImage}
          isVariant={baseProductForVariant !== null}
        />
        <ProductFormActions
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          isSubmitting={isSubmitting}
          isEditing={!!editingProduct}
        />
      </SlidingPane>

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTarget(null);
        }}
        product={deleteTarget}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Variant Management Modal */}
      <VariantManagementModal
        isOpen={isVariantModalOpen}
        onClose={() => {
          setIsVariantModalOpen(false);
          // Don't clear selectedProductForVariants here - keep it for the edit modal
        }}
        baseProduct={selectedProductForVariants || editingProduct}
        onEditVariant={handleEditVariant}
      />

      {/* Update Swatch Image Modal */}
      <UpdateSwatchModal
        isOpen={isUpdateSwatchModalOpen}
        onClose={() => setIsUpdateSwatchModalOpen(false)}
        product={editingProduct}
        updateSwatchMutation={updateSwatchMutation}
      />
    </div>
  );
};

export default AdminProducts;
