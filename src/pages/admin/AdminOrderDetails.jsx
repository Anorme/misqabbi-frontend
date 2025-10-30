import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchAdminOrderById } from '../../api/orders';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatCurrency, getStatusColor } from '../../utils/admin/tableHelpers';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminOrderById(id);
        setOrder(res?.data || null);
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading)
    return (
      <div className="py-10 flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  if (error)
    return (
      <div className="space-y-4">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>
      </div>
    );
  if (!order)
    return (
      <div className="space-y-4">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="text-sm text-gray-500">No order found.</div>
      </div>
    );

  const shortId = order?._id ? `#${order._id.slice(-6)}` : '#';
  const shipping = order.shippingInfo || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 mr-3"
            onClick={() => navigate('/admin/orders')}
          >
            Back to Orders
          </button>
          <span className="text-lg font-semibold text-gray-900">Order {shortId}</span>
        </div>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">Customer</h3>
          <p className="text-sm text-gray-700">{shipping.fullName}</p>
          <p className="text-sm text-gray-500">{shipping.email}</p>
          <p className="text-sm text-gray-500">{shipping.phone}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">Shipping</h3>
          <p className="text-sm text-gray-700">{shipping.deliveryAddress}</p>
          {shipping.deliveryNotes && (
            <p className="text-sm text-gray-500 mt-1">{shipping.deliveryNotes}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Payment</h3>
        <p className="text-sm text-gray-700 capitalize">Status: {order.paymentStatus}</p>
        <p className="text-sm text-gray-500 break-all">Reference: {order.paymentReference}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Items</h3>
        <div className="divide-y divide-gray-100">
          {order.items?.map((line, idx) => {
            const product = line.product || {};
            const image = (product.images && product.images[0]?.url) || '/images/Logo.png';
            const lineTotal = Number(line.price) * Number(line.quantity);
            return (
              <div key={product._id || idx} className="py-3 flex items-center gap-3">
                <img
                  src={image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <a
                      href={`/product/${product.slug}`}
                      className="text-sm font-medium text-msq-purple-rich hover:opacity-80 truncate"
                    >
                      {product.name}
                    </a>
                    <span className="text-sm text-gray-700">{formatCurrency(line.price)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Size: {line.size} • Qty: {line.quantity} • Price: {formatCurrency(lineTotal)}
                  </div>
                  {line.size === 'CUSTOM' && line.customSize && (
                    <div className="mt-2 pl-0 sm:pl-1">
                      <p className="text-xs font-medium text-gray-700 mb-1">Custom measurements</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
                        {Object.entries(line.customSize)
                          .filter(([, value]) => {
                            if (value === undefined || value === null) return false;
                            return String(value).trim() !== '';
                          })
                          .map(([rawKey, value]) => {
                            // Turn camelCase keys into readable labels
                            const readableLabel = rawKey
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^\w/, c => c.toUpperCase());
                            return (
                              <div key={rawKey} className="flex items-center gap-1">
                                <span className="text-gray-500">{readableLabel}:</span>
                                <span className="text-gray-800">{value}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">Totals</h3>
          <p className="text-sm text-gray-700">Total Price: {formatCurrency(order.totalPrice)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-500">
          <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(order.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
