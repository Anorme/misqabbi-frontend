import { toast } from 'react-toastify';
import CartAddedToast from '../components/ui/CartAddedToast';

export function showAddedToCartToast() {
  toast(CartAddedToast, {
    className: 'bg-msq-purple-rich text-white p-4 rounded-md shadow-lg',
    closeButton: false,
    ariaLabel: 'Item added to cart',
  });
}
