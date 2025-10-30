import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { fetchAdminDashboard } from '../../api/admin';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminDashboard();
        if (!cancelled) setData(res?.data || null);
      } catch (e) {
        if (!cancelled)
          setError(e?.response?.data?.message || e?.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalProducts = data?.totals?.products ?? 0;
  const totalOrders = data?.totals?.orders ?? 0;
  const totalUsers = data?.totals?.users ?? 0;
  const totalRevenue = data?.totals?.revenueByMonth[0]?.total;
  const recentOrders = data?.recentOrders || [];
  const lowStockProducts = data?.lowStock || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600">Welcome to the Misqabbi Admin Dashboard</p>
      </div>

      {loading ? (
        <div className="py-10 flex items-center justify-center">
          <LoadingSpinner size={48} />
        </div>
      ) : (
        <>
          {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Products" value={totalProducts} icon={Package} />
            <StatCard title="Total Orders" value={totalOrders} icon={ShoppingCart} />
            <StatCard title="Total Users" value={totalUsers} icon={Users} />
            <StatCard
              title="Total Revenue"
              value={`GHC ${Number(totalRevenue).toFixed(2)}`}
              icon={TrendingUp}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link
                  to="/admin/orders"
                  className="text-sm text-msq-purple-rich hover:text-msq-purple-deep"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-sm text-gray-500">Loading…</p>
                ) : recentOrders.length === 0 ? (
                  <p className="text-sm text-gray-500">No recent orders.</p>
                ) : (
                  recentOrders.map(order => (
                    <div
                      key={order.id || order._id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          #{String(order._id).slice(-6)}
                        </p>
                        <p className="text-xs text-gray-500">{order.user?.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          GHC {order.totalPrice.toFixed(2)}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            (order.status || '').toLowerCase() === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : (order.status || '').toLowerCase() === 'shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : (order.status || '').toLowerCase() === 'delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
                <Link
                  to="/admin/products"
                  className="text-sm text-msq-purple-rich hover:text-msq-purple-deep"
                >
                  Manage inventory
                </Link>
              </div>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-sm text-gray-500">Loading…</p>
                ) : lowStockProducts.length > 0 ? (
                  lowStockProducts.map(product => (
                    <div
                      key={product.id || product._id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">{product.stock} left</p>
                        {product.price != null && (
                          <p className="text-xs text-gray-500">GHC {product.price}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    All products are well stocked
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/products"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Package className="h-8 w-8 text-msq-purple-rich mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Manage Products</p>
                  <p className="text-sm text-gray-500">Add, edit, or remove products</p>
                </div>
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="h-8 w-8 text-msq-purple-rich mr-3" />
                <div>
                  <p className="font-medium text-gray-900">View Orders</p>
                  <p className="text-sm text-gray-500">Track and manage orders</p>
                </div>
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="h-8 w-8 text-msq-purple-rich mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-500">View and manage user accounts</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
