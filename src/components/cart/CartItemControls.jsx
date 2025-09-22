import { Plus, Minus, Trash2 } from 'lucide-react';
import useCartItem from '../../hooks/useCartItem';

const QuantityButton = ({ type, onClick }) => {
  const Icon = type === 'increase' ? Plus : Minus;
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </button>
  );
};

const QuantityDisplay = ({ quantity }) => {
  return <span className="text-sm font-lato font-medium w-8 text-center">{quantity}</span>;
};

const RemoveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200 ml-2"
    >
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  );
};

const CartItemControls = ({ item }) => {
  const { handleQuantityChange, handleRemove } = useCartItem(item);

  return (
    <div className="flex items-center space-x-2">
      <QuantityButton type="decrease" onClick={() => handleQuantityChange(item.quantity - 1)} />
      <QuantityDisplay quantity={item.quantity} />
      <QuantityButton type="increase" onClick={() => handleQuantityChange(item.quantity + 1)} />
      <RemoveButton onClick={handleRemove} />
    </div>
  );
};

export default CartItemControls;
