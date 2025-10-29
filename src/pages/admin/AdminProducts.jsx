import { useState, useEffect } from 'react';
import { generateId } from '../../utils/admin/mockData';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import { CATEGORIES } from '../../constants/categories';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { createAdminProduct, fetchAdminProducts } from '../../api/products';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: null,
    isPublished: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (value, product) => (
        <div className="flex items-center">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/40x40'}
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
      render: value => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
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
      onClick: product => handleDeleteProduct(product),
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
      isPublished: Boolean(product.isPublished) || false,
    });
    setIsModalOpen(true);
  };

  const handleViewProduct = product => {
    // For demo purposes, just show an alert
    alert(
      `Viewing product: ${product.name}\nPrice: ${formatCurrency(product.price)}\nStock: ${product.stock}`
    );
  };

  const handleDeleteProduct = product => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setProducts(products.filter(p => p.id !== product.id));
      showSuccessToast('Product deleted successfully');
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

        if (formData.images && formData.images.length > 0) {
          Array.from(formData.images).forEach(file => {
            body.append('images', file);
          });
        }

        const res = await createAdminProduct(body);
        showSuccessToast(res?.message || 'Product added successfully');
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
        // Refresh current page from server to reflect new data
        try {
          setLoading(true);
          const list = await fetchAdminProducts({ page: currentPage, limit });
          setProducts(list?.data || []);
          setTotalPages(list?.totalPages || 1);
        } catch (e) {
          // Non-blocking: surface error
          setError(e?.response?.data?.message || e?.message || 'Failed to refresh products');
        } finally {
          setLoading(false);
        }
        return; // keep mock list unchanged for now
      } catch (e) {
        const msg = e?.response?.data?.message || e?.message || 'Failed to create product';
        showErrorToast(msg);
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    // Below: existing mock update flow for editing only
    const imageUrls =
      formData.images && formData.images.length > 0
        ? Array.from(formData.images).map(file => URL.createObjectURL(file))
        : ['https://via.placeholder.com/300x400'];

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: imageUrls,
    };

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...productData } : p)));
      showSuccessToast('Product updated successfully');
    } else {
      // Add new product
      const newProduct = {
        id: generateId(),
        ...productData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProducts([newProduct, ...products]);
      showSuccessToast('Product added successfully');
    }

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
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // Fetch products on mount and when page/limit change
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminProducts({ page: currentPage, limit });
        if (!cancelled) {
          setProducts(res?.data || []);
          setTotalPages(res?.totalPages || 1);
        }
      } catch (e) {
        if (!cancelled)
          setError(e?.response?.data?.message || e?.message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [currentPage, limit]);

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

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-4">
          <FormField
            label="Product Name"
            value={formData.name}
            onChange={value => setFormData({ ...formData, name: value })}
            placeholder="Enter product name"
            required
          />

          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={value => setFormData({ ...formData, description: value })}
            placeholder="Enter product description"
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Price"
              type="number"
              value={formData.price}
              onChange={value => setFormData({ ...formData, price: value })}
              placeholder="0.00"
              required
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
            label="Product Images"
            type="file"
            value={formData.images}
            onChange={files => setFormData({ ...formData, images: files })}
          />

          <div className="flex justify-end space-x-3 pt-4">
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
      </AdminModal>
    </div>
  );
};

export default AdminProducts;
