import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DataTable from '../../components/admin/DataTable';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAdminEvents } from '../../hooks/queries/useAdmin';
import {
  EVENT_STATUSES,
  EVENT_TYPES,
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
} from '../../constants/events';
import { formatEventDateShort } from '../../utils/events';
import { getEventStatusColor, getEventTypeColor } from '../../utils/events/statusBadges';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  ...EVENT_STATUSES.map(value => ({ value, label: EVENT_STATUS_LABELS[value] })),
];

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  ...EVENT_TYPES.map(value => ({ value, label: EVENT_TYPE_LABELS[value] })),
];

const AdminEvents = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    setPage(1);
  }, [status, type]);

  const params = { page, limit };
  if (status) params.status = status;
  if (type) params.type = type;

  const { data, isLoading, isError, error } = useAdminEvents(params);
  const rawList = data?.data || [];
  const list = rawList.map(item => ({ ...item, id: item._id }));
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load events'
    : null;

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: v => <span className="font-medium text-gray-900">{v || '—'}</span>,
    },
    {
      key: 'eventDate',
      label: 'Date',
      render: v => formatEventDateShort(v),
    },
    {
      key: 'type',
      label: 'Type',
      render: v => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getEventTypeColor(v)}`}
        >
          {EVENT_TYPE_LABELS[v] || v || '—'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: v => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getEventStatusColor(v)}`}
        >
          {EVENT_STATUS_LABELS[v] || v || '—'}
        </span>
      ),
    },
    {
      key: 'maxAttendees',
      label: 'Capacity',
      render: v => (v != null ? v : '—'),
    },
  ];

  const actions = [
    { component: ViewButton, onClick: e => navigate(`/admin/events/${e._id}`), title: 'View' },
    {
      component: EditButton,
      onClick: e => navigate(`/admin/events/${e._id}/edit`),
      title: 'Edit',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Events"
        actionLabel="Create event"
        onAction={() => navigate('/admin/events/new')}
      />

      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="px-3 py-2 rounded-md text-sm bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-msq-purple-rich"
          >
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="px-3 py-2 rounded-md text-sm bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-msq-purple-rich"
          >
            {TYPE_OPTIONS.map(o => (
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

export default AdminEvents;
