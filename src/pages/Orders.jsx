import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useOrders } from '../hooks/queries/useOrders';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import OrderList from '../components/orders/OrderList';
import PaginationLocal from '../components/orders/PaginationLocal';
import Separator from '../components/orders/Separator';
import SEO from '../components/SEO';

const Orders = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [expanded, setExpanded] = useState({});

  // Use TanStack Query for orders fetching with caching
  const {
    data: ordersData,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useOrders({ page, limit });

  const orders = useMemo(() => ordersData?.data || [], [ordersData?.data]);
  const totalPages = ordersData?.totalPages || 1;

  const toggleExpanded = id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = () => {
    if (canPrev) setPage(p => p - 1);
  };
  const handleNext = () => {
    if (canNext) setPage(p => p + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="My Orders"
        description="View and track all your Misqabbi orders in one place."
        robots="noindex,nofollow"
      />
      <h1 className="text-2xl font-semibold text-msq-purple-rich">My Orders</h1>
      <Separator />

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {!loading && isError && (
        <div className="mt-6 p-4 rounded-md border border-red-200 bg-red-50 text-red-700">
          <div className="flex items-center justify-between">
            <span className="text-sm">{error?.message || 'Failed to load orders'}</span>
            <button
              onClick={() => refetch()}
              className="text-sm font-medium underline hover:opacity-80"
              aria-label="Retry loading orders"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !isError && orders.length === 0 && (
        <div className="mt-8 p-8 text-center border border-gray-200 rounded-lg bg-white">
          <div className="text-lg font-medium text-gray-900">No orders yet</div>
          <p className="mt-2 text-sm text-gray-600">
            When you place an order, it will appear here.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-4 px-4 py-2 rounded-md bg-msq-purple-rich text-white hover:opacity-80"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {/* Orders list */}
      {!loading && !error && orders.length > 0 && (
        <div className="mt-6">
          <OrderList
            orders={orders}
            expandedMap={expanded}
            onToggle={toggleExpanded}
            onView={id => navigate(`/orders/${id}`)}
          />
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <PaginationLocal
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Orders;
