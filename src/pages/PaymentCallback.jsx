import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { verifyPayment } from '../api/payments';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useCartDispatch } from '../contexts/cart/useCart';
import { clearCart } from '../contexts/cart/cartActions';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cartDispatch = useCartDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (!reference) {
      setError('Missing payment reference');
      return;
    }
    (async () => {
      try {
        const res = await verifyPayment(reference);
        const orderId = res?.data?.order;
        if (!orderId) throw new Error('Order not found');

        // Clear cart after successful payment verification
        cartDispatch(clearCart());

        navigate(`/orders/${orderId}`, { replace: true });
      } catch (e) {
        setError(e?.message || 'Verification failed');
      }
    })();
  }, [searchParams, navigate, cartDispatch]);

  if (error) {
    return (
      <div className="py-16 flex flex-col items-center gap-4">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          className="px-4 py-2 rounded bg-msq-purple-rich text-white"
          onClick={() => navigate('/orders')}
        >
          Go to orders
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 flex justify-center">
      <LoadingSpinner size={72} />
    </div>
  );
};

export default PaymentCallback;
