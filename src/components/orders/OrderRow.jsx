import { ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderItems from './OrderItems';
import { ORDERS_CURRENCY } from './constants';

const formatDate = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString();
};

const formatCurrency = value => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: ORDERS_CURRENCY,
    }).format(Number(value) || 0);
  } catch {
    return `${Number(value || 0).toFixed(2)}`;
  }
};

const OrderRow = ({ order, isOpen, onToggle, onView }) => {
  const shortId = order?._id ? `#${order._id.slice(-6)}` : '#';
  const created = formatDate(order?.createdAt);
  const itemCount = Array.isArray(order?.items)
    ? order.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
    : 0;
  const total = formatCurrency(order?.totalPrice);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:outline-none cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-gray-900">{shortId}</span>
          <span className="text-xs sm:text-sm text-gray-500">{created}</span>
          <StatusBadge status={order?.status || 'pending'} />
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm text-gray-600 hidden xs:inline">
            {itemCount} items
          </span>
          <span className="text-sm font-medium text-gray-900">{total}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div>
          <OrderItems order={order} />
          <div className="px-4 pb-4 flex justify-end">
            <button
              onClick={onView}
              className="text-sm text-msq-purple-deep hover:text-msq-purple-rich cursor-pointer"
            >
              View details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderRow;
