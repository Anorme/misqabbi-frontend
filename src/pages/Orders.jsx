import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getOrders } from '../api/orders';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import OrderList from '../components/orders/OrderList';
import PaginationLocal from '../components/orders/PaginationLocal';
import Separator from '../components/orders/Separator';
import SEO from '../components/SEO';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpanded = id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchPage = async p => {
    setLoading(true);
    setError(null);
    try {
      const res = await getOrders({ page: p, limit });
      setOrders(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      // If backend returns 401/403, rely on existing guard via route; still expose error
      setError(err?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = () => {
    if (canPrev) setPage(p => p - 1);
  };
  const handleNext = () => {
    if (canNext) setPage(p => p + 1);
  };

  const empty = !loading && !error && orders.length === 0;

  const orderRows = useMemo(() => orders, [orders]);

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
      {!loading && error && (
        <div className="mt-6 p-4 rounded-md border border-red-200 bg-red-50 text-red-700">
          <div className="flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => fetchPage(page)}
              className="text-sm font-medium underline hover:opacity-80"
              aria-label="Retry loading orders"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {empty && (
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
            orders={orderRows}
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
