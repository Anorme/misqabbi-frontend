import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuthState } from '../contexts/auth/useAuth';
import { useCartState } from '../contexts/cart/useCart';
import { getCartItems } from '../contexts/cart/cartSelectors';

import { createOrder } from '../api/orders';
import { showErrorToast } from '../utils/showToast';

import CheckoutHeader from '../components/checkout/CheckoutHeader';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import SEO from '../components/SEO';

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthState();
  const cartState = useCartState();

  const cartItems = getCartItems(cartState);

  const [isLoading, setIsLoading] = useState(false);
  const [isExpressService, setIsExpressService] = useState(false);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState(null);

  // Redirect if cart is empty (but not during order placement)
  useEffect(() => {
    if (cartItems.length === 0 && !isLoading) {
      navigate('/shop');
    }
  }, [cartItems.length, isLoading, navigate]);

  const handlePlaceOrder = async formData => {
    setIsLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
          // Include custom size data if present
          ...(item.customSize && { customSize: item.customSize }),
        })),
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          deliveryAddress: formData.deliveryAddress,
          deliveryNotes: formData.deliveryNotes,
        },
      };

      if (appliedDiscountCode) {
        orderData.discountCode = appliedDiscountCode;
      }

      // Create order with expressService query parameter
      const response = await createOrder(orderData, isExpressService);

      if (response.success) {
        // Redirect to Paystack authorization page (external URL)
        window.location.href = response.data.authorizationUrl;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      showErrorToast('Failed to place order.  ' + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if cart is being checked
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <LoadingSpinner size={60} color="#cfb484" />
          <p className="text-gray-600 mt-4 font-lato">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <SEO
        title="Checkout"
        description="Complete your Misqabbi order with secure payment and delivery information."
        robots="noindex,nofollow"
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <CheckoutHeader />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-6">
            <CheckoutForm
              onPlaceOrder={handlePlaceOrder}
              userData={currentUser}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <OrderSummary
              onExpressServiceChange={setIsExpressService}
              onDiscountChange={setAppliedDiscountCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
