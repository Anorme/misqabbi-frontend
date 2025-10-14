import OrderRow from './OrderRow';

const OrderList = ({ orders, expandedMap, onToggle, onView }) => {
  return (
    <div className="space-y-3">
      {orders.map(order => (
        <OrderRow
          key={order._id}
          order={order}
          isOpen={!!expandedMap[order._id]}
          onToggle={() => onToggle(order._id)}
          onView={() => onView(order._id)}
        />
      ))}
    </div>
  );
};

export default OrderList;
