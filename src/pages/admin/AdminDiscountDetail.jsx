import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import DataTable from '../../components/admin/DataTable';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAdminDiscount, useAdminDiscountUsage } from '../../hooks/queries/useAdmin';

const AdminDiscountDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usagePage, setUsagePage] = useState(1);
  const usageLimit = 20;

  const { data: discountData, isLoading, isError, error } = useAdminDiscount(id);
  const { data: usageData, isLoading: usageLoading } = useAdminDiscountUsage(id, {
    page: usagePage,
    limit: usageLimit,
  });

  const discount = discountData?.data || null;
  const usageList = usageData?.data || [];
  const usagePagination = usageData?.pagination || {};
  const usageTotalPages = usagePagination.totalPages || 1;
  const usageRows = usageList.map((row, idx) => ({ ...row, id: row._id || idx }));

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load discount'
    : null;

  const usageColumns = [
    {
      key: 'user',
      label: 'User',
      render: (v, row) => {
        const u = row.user;
        if (!u) return '—';
        return (
          <div>
            <p className="font-medium text-gray-900">{u.displayName || u.email || '—'}</p>
            {u.email && <p className="text-xs text-gray-500">{u.email}</p>}
          </div>
        );
      },
    },
    {
      key: 'order',
      label: 'Order',
      render: (v, row) => {
        const o = row.order;
        if (!o) return '—';
        return (
          <span className="text-sm">
            {o._id ? `#${String(o._id).slice(-6)}` : '—'} · {formatCurrency(o.totalPrice)}
          </span>
        );
      },
    },
    {
      key: 'usedAt',
      label: 'Date used',
      render: v => (v ? new Date(v).toLocaleString() : '—'),
    },
    {
      key: 'amountSaved',
      label: 'Amount saved',
      render: v => (v != null ? formatCurrency(v) : '—'),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    );
  if (errMsg)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to Discounts
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{errMsg}</div>
      </div>
    );
  if (!discount)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to Discounts
        </button>
        <p className="text-gray-500">Discount not found.</p>
      </div>
    );

  const usageStats = discount.usageStats || {};
  const isActive = discount.isActive;
  const typeLabel =
    discount.discountType === 'percentage'
      ? `${discount.discountValue}% off`
      : discount.discountType === 'fixed'
        ? formatCurrency(discount.discountValue) + ' off'
        : discount.discountType || '—';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to Discounts
        </button>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-sm font-medium bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple-deep"
            onClick={() => navigate(`/admin/discounts/${id}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide mb-6">
        Discount: {discount.code}
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Details</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Code</dt>
              <dd className="font-medium text-gray-900">{discount.code}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Description</dt>
              <dd className="text-gray-700">{discount.description || '—'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Type</dt>
              <dd className="text-gray-700">{typeLabel}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Scope</dt>
              <dd className="text-gray-700 capitalize">{discount.scope || '—'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Usage type</dt>
              <dd className="text-gray-700">
                {discount.usageType ? discount.usageType.replace('_', ' ') : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Active</dt>
              <dd>
                {isActive ? (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    No
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Expiry</dt>
              <dd className="text-gray-700">
                {discount.expiryDate ? new Date(discount.expiryDate).toLocaleDateString() : '—'}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Usage stats</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Total uses</dt>
              <dd className="font-medium text-gray-900">{usageStats.totalUsage ?? 0}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Unique users</dt>
              <dd className="text-gray-700">{usageStats.uniqueUsers ?? 0}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Total amount saved</dt>
              <dd className="text-gray-700 font-medium">
                {usageStats.totalAmountSaved != null
                  ? formatCurrency(usageStats.totalAmountSaved)
                  : '—'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Usage history */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Usage history</h3>
        </div>
        {usageLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size={36} />
          </div>
        ) : usageRows.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">No usage recorded yet.</div>
        ) : (
          <>
            <DataTable columns={usageColumns} data={usageRows} />
            {usageTotalPages > 1 && (
              <div className="p-4 border-t border-gray-200">
                <PaginationLocal
                  page={usagePage}
                  totalPages={usageTotalPages}
                  onPrev={() => setUsagePage(p => Math.max(1, p - 1))}
                  onNext={() => setUsagePage(p => Math.min(usageTotalPages, p + 1))}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDiscountDetail;
