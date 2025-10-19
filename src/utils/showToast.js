import { toast } from 'react-toastify';
import CartAddedToast from '../components/toasts/CartAddedToast';
import FavoritesAddedToast from '../components/toasts/FavoritesAddedToast';
import FavoritesRemovedToast from '../components/toasts/FavoritesRemovedToast';

// Generic toast utility for consistent styling
const showCustomToast = (ToastComponent, ariaLabel) => {
  toast(ToastComponent, {
    className: 'bg-msq-purple-rich text-white p-4 rounded-md shadow-lg',
    closeButton: false,
    ariaLabel,
  });
};

// Specific toast functions
export function showAddedToCartToast() {
  showCustomToast(CartAddedToast, 'Item added to cart');
}

export function showAddedToFavoritesToast() {
  showCustomToast(FavoritesAddedToast, 'Item added to favorites');
}

export function showRemovedFromFavoritesToast() {
  showCustomToast(FavoritesRemovedToast, 'Item removed from favorites');
}

// Generic error toast
export function showErrorToast(message) {
  toast.error(message, {
    className: 'bg-red-500 text-white p-4 rounded-md shadow-lg',
    closeButton: true,
  });
}

// Generic success toast
export function showSuccessToast(message) {
  toast.success(message, {
    className: 'bg-green-500 text-white p-4 rounded-md shadow-lg',
    closeButton: true,
  });
}

// Order placed toast
export function showOrderPlacedToast() {
  toast.success(
    'Order Placed Successfully! Your order has been confirmed and is being processed.',
    {
      className: 'bg-green-500 text-white p-4 rounded-md shadow-lg',
      closeButton: true,
      autoClose: 5000,
    }
  );
}
