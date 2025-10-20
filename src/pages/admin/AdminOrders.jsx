import { useState } from 'react';
import { mockOrders } from '../../utils/admin/mockData';
import { paginateData, formatCurrency, getStatusColor } from '../../utils/admin/tableHelpers';
import { orderStatuses } from '../../utils/admin/mockData';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const itemsPerPage = 8;

  // Filter orders by status
  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  const { paginatedData, totalPages } = paginateData(filteredOrders, currentPage, itemsPerPage);

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order #',
      render: value => <span className="font-medium text-gray-900">{value}</span>,
    },
    {
      key: 'customerName',
      label: 'Customer',
      render: (value, order) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{order.customerEmail}</p>
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
    {
      component: DeleteButton,
      onClick: order => handleDeleteOrder(order),
      title: 'Delete Order',
    },
  ];

  const handleViewOrder = order => {
    const orderDetails = `
Order: ${order.orderNumber}
Customer: ${order.customerName} (${order.customerEmail})
Date: ${new Date(order.createdAt).toLocaleDateString()}
Status: ${order.status}
Total: ${formatCurrency(order.totalPrice)}
Items:
${order.items.map(item => `- ${item.name} x${item.quantity} - ${formatCurrency(item.price)}`).join('\n')}
Shipping: ${order.shippingAddress}
    `;
    alert(orderDetails);
  };

  const handleEditOrder = order => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = order => {
    if (window.confirm(`Are you sure you want to delete order "${order.orderNumber}"?`)) {
      setOrders(orders.filter(o => o.id !== order.id));
      showSuccessToast('Order deleted successfully');
    }
  };

  const handleUpdateStatus = () => {
    if (!selectedStatus) {
      showErrorToast('Please select a status');
      return;
    }

    setOrders(
      orders.map(order =>
        order.id === editingOrder.id ? { ...order, status: selectedStatus } : order
      )
    );

    showSuccessToast('Order status updated successfully');
    setIsModalOpen(false);
    setEditingOrder(null);
    setSelectedStatus('');
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

      <DataTable columns={columns} data={paginatedData} actions={actions} />

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
