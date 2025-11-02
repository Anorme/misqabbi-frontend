import { useParams } from 'react-router';
import { useOrder } from '../hooks/queries/useOrders';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import useMediaQuery from '../hooks/useMediaQuery';
import ProgressBar from '../components/orders/ProgressBar';
import Separator from '../components/orders/Separator';
import { ORDER_STEPS, statusToIndex } from '../components/orders/constants';
import SEO from '../components/SEO';

const stepsConfig = ORDER_STEPS;

// Helper to derive timeline from status
const deriveTimelineFromStatus = status => {
  const statusIndex = statusToIndex(status);
  const timeline = {};

  ORDER_STEPS.forEach((step, index) => {
    timeline[step.key] = index <= statusIndex;
  });

  return timeline;
};

const OrderDetails = () => {
  const { id } = useParams();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  // Use TanStack Query for order fetching with caching
  const { data: orderData, isLoading: loading, isError, error: queryError } = useOrder(id);

  // Derive timeline from order status
  const order = orderData?.data
    ? {
        ...orderData.data,
        timeline: deriveTimelineFromStatus(orderData.data.status),
      }
    : null;

  const error = isError
    ? queryError?.message || 'Failed to load order details'
    : orderData?.data
      ? null
      : 'Order not found';

  // index resolver imported from constants for consistency
  const deriveActiveIndex = currentOrder => {
    if (!currentOrder) return 0;
    const timeline = currentOrder.timeline || {};
    // Find the highest index in ORDER_STEPS whose key is truthy in timeline
    let highest = -1;
    for (let i = 0; i < ORDER_STEPS.length; i++) {
      const step = ORDER_STEPS[i];
      if (timeline[step.key]) highest = i;
    }
    if (highest >= 0) return highest;
    return statusToIndex(currentOrder.status || 'accepted');
  };

  const activeIndex = deriveActiveIndex(order);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Order Details"
        description="Track the progress of your Misqabbi order from acceptance to delivery."
        robots="noindex,nofollow"
      />
      <h1 className="text-2xl font-semibold text-msq-purple-rich">Order progress</h1>
      <Separator />

      {loading && (
        <div className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 p-4 rounded-md border border-red-200 bg-red-50 text-red-700">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {!loading && order && (
        <div className="mt-8">
          {/* Mobile: vertical timeline */}
          {!isDesktop && (
            <ol className="space-y-4">
              {stepsConfig.map((step, idx) => {
                const Icon = step.icon;
                const complete = idx <= activeIndex || order?.timeline?.[step.key];
                return (
                  <li key={step.key} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full ${
                        complete ? 'bg-msq-purple-rich text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon size={14} />
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{step.label}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {/* Desktop: horizontal progress */}
          {isDesktop && (
            <div>
              <ProgressBar totalSteps={stepsConfig.length} activeIndex={activeIndex} />
              <div className="grid grid-cols-7 gap-4 mt-3">
                {stepsConfig.map((step, idx) => {
                  const Icon = step.icon;
                  const complete = idx <= activeIndex || order?.timeline?.[step.key];
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full shadow ${
                          complete
                            ? 'bg-msq-purple-rich text-white'
                            : 'bg-white text-gray-500 border border-gray-200'
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="mt-2 text-sm font-medium text-gray-900">{step.label}</div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                We’re thoughtfully preparing and moving your order with gentle care.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
