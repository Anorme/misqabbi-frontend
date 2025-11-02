import { useState } from 'react';
import { useNavigate } from 'react-router';

import { formatCurrency, getStatusColor } from '../../utils/admin/tableHelpers';

import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { useAdminOrders } from '../../hooks/queries/useAdmin';
import { useUpdateOrderStatus } from '../../hooks/mutations/useOrderMutations';

import { orderStatuses } from '../../constants/admin';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Use TanStack Query for orders fetching with caching
  const {
    data: ordersData,
    isLoading: loading,
    isError,
    error: queryError,
  } = useAdminOrders({ page: currentPage, limit });

  const orders = ordersData?.data || [];
  const totalPages = ordersData?.totalPages || 1;
  const error = isError
    ? queryError?.response?.data?.message || queryError?.message || 'Failed to load orders'
    : null;

  // Mutation hook
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const getCustomerDetail = (order, detail) => order.shippingInfo[detail];

  // Optional client-side filter; server pagination remains authoritative
  const filteredOrders = statusFilter ? orders.filter(o => o.status === statusFilter) : orders;
  const shortId = order => (order?._id ? `#${order._id.slice(-6)}` : '#');

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order #',
      render: (value, order) => <span className="font-medium text-gray-900">{shortId(order)}</span>,
    },
    {
      key: 'customerName',
      label: 'Customer',
      render: (value, order) => (
        <div>
          <p className="font-medium text-gray-900">{getCustomerDetail(order, 'fullName')}</p>
          <p className="text-sm text-gray-500">{getCustomerDetail(order, 'email')}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: value => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: value => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'totalPrice',
      label: 'Total',
      render: value => formatCurrency(value),
    },
    {
      key: 'items',
      label: 'Items',
      render: value => (
        <span className="text-sm text-gray-600">
          {value.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      ),
    },
  ];

  const actions = [
    {
      component: ViewButton,
      onClick: order => handleViewOrder(order),
      title: 'View Order',
    },
    {
      component: EditButton,
      onClick: order => handleEditOrder(order),
      title: 'Update Status',
    },
  ];

  const handleViewOrder = order => {
    const id = order?._id || order?.id;
    if (!id) {
      showErrorToast('Unable to view order: missing id');
      return;
    }
    navigate(`/admin/orders/${id}`);
  };

  const handleEditOrder = order => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      showErrorToast('Please select a status');
      return;
    }
    try {
      await updateOrderStatusMutation.mutateAsync({
        id: editingOrder._id || editingOrder.id,
        status: selectedStatus,
      });
      showSuccessToast('Order status updated successfully');
      setIsModalOpen(false);
      setEditingOrder(null);
      setSelectedStatus('');
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to update order status';
      showErrorToast(msg);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = status => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Orders Management" />

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={e => handleStatusFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent"
          >
            <option value="">All Orders</option>
            {orderStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
      </div>

      {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

      {loading ? (
        <div className="py-10 flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={filteredOrders} actions={actions} />
          {!error && filteredOrders.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-6">No orders found.</div>
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
        title="Update Order Status"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
            <p className="text-sm text-gray-600">Order: {editingOrder?.orderNumber}</p>
            <p className="text-sm text-gray-600">Customer: {editingOrder?.customerName}</p>
            <p className="text-sm text-gray-600">Current Status: {editingOrder?.status}</p>
          </div>

          <FormField
            label="New Status"
            type="select"
            value={selectedStatus}
            onChange={value => setSelectedStatus(value)}
            options={orderStatuses}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateStatus}
              className="px-4 py-2 text-sm font-medium text-white bg-msq-purple-rich rounded-md hover:bg-msq-purple-deep transition-colors"
            >
              Update Status
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminOrders;
