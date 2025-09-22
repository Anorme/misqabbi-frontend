import { useCartDispatch } from '../contexts/cart/useCart';
import { updateCartItem, removeFromCart, changeItemSize } from '../contexts/cart/cartActions';

const useCartItem = item => {
  const dispatch = useCartDispatch();

  const handleQuantityChange = newQuantity => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(updateCartItem({ ...item, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };

  const handleSizeChange = newSize => {
    dispatch(changeItemSize(item, newSize));
  };

  return {
    handleQuantityChange,
    handleRemove,
    handleSizeChange,
  };
};

export default useCartItem;
