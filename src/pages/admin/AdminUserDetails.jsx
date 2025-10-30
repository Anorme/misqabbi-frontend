import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchAdminUserAnalytics } from '../../api/users';
import { formatCurrency } from '../../utils/admin/tableHelpers';

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminUserAnalytics(id);
        if (!cancelled) setData(res?.data || null);
      } catch (e) {
        if (!cancelled)
          setError(e?.response?.data?.message || e?.message || 'Failed to load user analytics');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const user = data || {};

  if (loading)
    return (
      <div className="py-10 flex items-center justify-center">
        <span className="text-sm text-gray-500">Loading user…</span>
      </div>
    );
  if (error)
    return (
      <div className="space-y-4">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 mr-3"
            onClick={() => navigate('/admin/users')}
          >
            Back to Users
          </button>
          <span className="text-lg font-semibold text-gray-900">{user?.displayName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-msq-purple-rich mb-2">Profile</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-900">{user?.displayName}</p>
            <p className="text-sm text-gray-500 break-all">{user?.email}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-msq-purple-rich mb-2">Analytics</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-md bg-purple-50">
              <p className="text-xs text-msq-purple-rich">Total Orders</p>
              <p className="text-base font-semibold text-gray-900">{user?.totalOrders ?? '-'}</p>
            </div>
            <div className="p-3 rounded-md bg-purple-50">
              <p className="text-xs text-msq-purple-rich">Total Spent</p>
              <p className="text-base font-semibold text-gray-900">
                {user?.totalSpent != null ? formatCurrency(user.totalSpent) : '-'}
              </p>
            </div>
            <div className="p-3 rounded-md bg-purple-50">
              <p className="text-xs text-msq-purple-rich">Avg Order Value</p>
              <p className="text-base font-semibold text-gray-900">
                {user?.avgOrderValue != null ? formatCurrency(user.avgOrderValue) : '-'}
              </p>
            </div>
            <div className="p-3 rounded-md bg-purple-50">
              <p className="text-xs text-msq-purple-rich">First Order</p>
              <p className="text-base font-semibold text-gray-900">
                {user?.firstOrderDate ? new Date(user.firstOrderDate).toLocaleDateString() : '-'}
              </p>
            </div>
            <div className="p-3 rounded-md bg-purple-50">
              <p className="text-xs text-msq-purple-rich">Last Order</p>
              <p className="text-base font-semibold text-gray-900">
                {user?.lastOrderDate ? new Date(user.lastOrderDate).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>

        {Array.isArray(user?.recentOrders) && user.recentOrders.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-msq-purple-rich">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">Order</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Items</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {user.recentOrders.slice(0, 10).map(o => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 text-gray-900">#{String(o.id).slice(-6)}</td>
                      <td className="py-2 pr-4 text-gray-600">
                        {new Date(o.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4 text-gray-700">{o.itemCount}</td>
                      <td className="py-2 pr-4 capitalize">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-purple-50 text-msq-purple-rich">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-right font-semibold text-gray-900">
                        {formatCurrency(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetails;
