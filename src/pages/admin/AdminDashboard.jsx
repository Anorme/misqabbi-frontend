import { Link } from 'react-router';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { mockProducts, mockOrders, mockUsers } from '../../utils/admin/mockData';

const AdminDashboard = () => {
  // Calculate stats from mock data
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalUsers = mockUsers.length;
  const totalRevenue = mockOrders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const recentOrders = mockOrders.slice(0, 5);
  const lowStockProducts = mockProducts.filter(product => product.stock < 10);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600">Welcome to the Misqabbi Admin Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          trend="+2 this week"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          trend="+5 this week"
        />
        <StatCard title="Total Users" value={totalUsers} icon={Users} trend="+3 this week" />
        <StatCard
          title="Total Revenue"
          value={`GHC ${totalRevenue.toFixed(2)}`}
          icon={TrendingUp}
          trend="+12% this month"
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
            {recentOrders.map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">GHC {order.totalPrice}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
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
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">{product.stock} left</p>
                    <p className="text-xs text-gray-500">GHC {product.price}</p>
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
    </div>
  );
};

export default AdminDashboard;
