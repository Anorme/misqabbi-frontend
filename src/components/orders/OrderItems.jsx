import { Link } from 'react-router';
import { ORDERS_CURRENCY } from './constants';

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

const OrderItems = ({ order }) => {
  return (
    <div className="px-4 pb-4">
      <div className="divide-y divide-gray-100">
        {order.items?.map(line => {
          const product = line?.product || {};
          const imageSrc = product?.images?.[0] || '/images/Logo.png';
          const qty = line?.quantity || 0;
          const unitPrice = product?.price ?? line?.price ?? 0;
          const unit = formatCurrency(unitPrice);
          const lineTotal = formatCurrency(unitPrice * qty);

          return (
            <div
              key={`${order._id}-${product?._id || Math.random()}`}
              className="py-3 flex items-center gap-3"
            >
              <img
                src={imageSrc}
                alt={product?.name || 'Product'}
                className="w-12 h-12 object-cover rounded-md bg-gray-100 flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${product?.slug}`}
                  className="text-sm font-medium text-msq-purple-rich hover:opacity-80 truncate block"
                >
                  {product?.name || 'Product'}
                </Link>
                <div className="text-xs text-gray-500">
                  <span className="hidden sm:inline">Unit: {unit} • </span>
                  Qty: {qty}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">{lineTotal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItems;
