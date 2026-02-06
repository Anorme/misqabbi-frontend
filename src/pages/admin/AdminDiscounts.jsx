import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import DataTable from '../../components/admin/DataTable';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAdminDiscounts } from '../../hooks/queries/useAdmin';

const SCOPE_OPTIONS = [
  { value: '', label: 'All scopes' },
  { value: 'order', label: 'Order' },
  { value: 'products', label: 'Products' },
];
const USAGE_TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'single_use', label: 'Single use' },
  { value: 'multi_use', label: 'Multi use' },
  { value: 'per_user', label: 'Per user' },
];
const ACTIVE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];
const EXPIRED_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Expired' },
  { value: 'false', label: 'Not expired' },
];

const AdminDiscounts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState('');
  const [isActive, setIsActive] = useState('');
  const [scope, setScope] = useState('');
  const [usageType, setUsageType] = useState('');
  const [expired, setExpired] = useState('');

  const params = { page, limit };
  if (q.trim()) params.q = q.trim();
  if (isActive) params.isActive = isActive;
  if (scope) params.scope = scope;
  if (usageType) params.usageType = usageType;
  if (expired) params.expired = expired;

  const { data, isLoading, isError, error } = useAdminDiscounts(params);
  const rawList = data?.data || [];
  const list = rawList.map(item => ({ ...item, id: item._id }));
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load discounts'
    : null;

  const columns = [
    {
      key: 'code',
      label: 'Code',
      render: v => <span className="font-medium text-gray-900">{v || '—'}</span>,
    },
    {
      key: 'description',
      label: 'Description',
      render: v => <span className="text-gray-600">{v || '—'}</span>,
    },
    {
      key: 'discountType',
      label: 'Type',
      render: (v, row) => (
        <span className="text-sm">
          {v === 'percentage'
            ? `${row.discountValue}%`
            : v === 'fixed'
              ? formatCurrency(row.discountValue)
              : v || '—'}
        </span>
      ),
    },
    {
      key: 'scope',
      label: 'Scope',
      render: v => <span className="text-sm capitalize">{v || '—'}</span>,
    },
    {
      key: 'usageType',
      label: 'Usage',
      render: v => <span className="text-sm">{v ? v.replace('_', ' ') : '—'}</span>,
    },
    {
      key: 'isActive',
      label: 'Active',
      render: v =>
        v ? (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Yes
          </span>
        ) : (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            No
          </span>
        ),
    },
    {
      key: 'expiryDate',
      label: 'Expiry',
      render: v => (v ? new Date(v).toLocaleDateString() : '—'),
    },
    {
      key: 'currentGlobalUses',
      label: 'Uses',
      render: (v, row) => (
        <span className="text-sm">
          {v != null ? v : 0}
          {row.maxGlobalUses != null ? ` / ${row.maxGlobalUses}` : ''}
        </span>
      ),
    },
  ];

  const actions = [
    { component: ViewButton, onClick: d => navigate(`/admin/discounts/${d._id}`), title: 'View' },
    {
      component: EditButton,
      onClick: d => navigate(`/admin/discounts/${d._id}/edit`),
      title: 'Edit',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Discounts"
        actionLabel="Create discount"
        onAction={() => navigate('/admin/discounts/new')}
      />
      {/* Filters */}
      <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            type="search"
            placeholder="Search code or description"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich focus:border-msq-purple-rich"
          />
          <select
            value={isActive}
            onChange={e => setIsActive(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich"
          >
            {ACTIVE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={scope}
            onChange={e => setScope(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich"
          >
            {SCOPE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={usageType}
            onChange={e => setUsageType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich"
          >
            {USAGE_TYPE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={expired}
            onChange={e => setExpired(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich"
          >
            {EXPIRED_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errMsg && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm font-lato">{errMsg}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size={48} />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={list} actions={actions} />
          {totalPages > 1 && (
            <PaginationLocal
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage(p => Math.max(1, p - 1))}
              onNext={() => setPage(p => Math.min(totalPages, p + 1))}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminDiscounts;
