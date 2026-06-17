import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import DataTable from '../../components/admin/DataTable';
import { ViewButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import AdminEventDetailLayout from '../../components/admin/AdminEventDetailLayout';
import { useAdminEvent, useAdminVolunteerApplications } from '../../hooks/queries/useAdmin';
import { useUpdateAdminEventStatus } from '../../hooks/mutations/useEventMutations';
import {
  EVENT_STATUS,
  EVENT_TYPE,
  VOLUNTEER_STATUSES,
  VOLUNTEER_STATUS_LABELS,
} from '../../constants/events';
import { getVolunteerStatusColor } from '../../utils/events/statusBadges';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  ...VOLUNTEER_STATUSES.map(value => ({
    value,
    label: VOLUNTEER_STATUS_LABELS[value],
  })),
];

const getApplicantName = row => row.applicantInfo?.name || row.user?.displayName || '—';
const getApplicantEmail = row => row.applicantInfo?.email || row.user?.email || '—';

const AdminEventVolunteers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateStatus = useUpdateAdminEventStatus();
  const [statusError, setStatusError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState('');

  const { data: eventData, isLoading, isError, error } = useAdminEvent(id);
  const event = eventData?.data || null;

  useEffect(() => {
    setPage(1);
  }, [status]);

  const params = { page, limit };
  if (status) params.status = status;

  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    isError: applicationsIsError,
    error: applicationsError,
  } = useAdminVolunteerApplications(id, params);

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load event'
    : null;

  const applicationsErrMsg = applicationsIsError
    ? applicationsError?.response?.data?.error ||
      applicationsError?.message ||
      'Failed to load volunteer applications'
    : null;

  const ticketTypes = event?.ticketTypes || [];
  const hasActiveTickets = ticketTypes.some(t => t.isActive);
  const showPaidTicketWarning =
    event?.type === EVENT_TYPE.PAID && event?.status === EVENT_STATUS.DRAFT && !hasActiveTickets;

  const rawList = applicationsData?.data || [];
  const list = rawList.map(item => ({ ...item, id: item._id }));
  const totalPages = applicationsData?.totalPages || applicationsData?.pagination?.totalPages || 1;

  const handleStatusChange = async newStatus => {
    const labels = { [EVENT_STATUS.PUBLISHED]: 'publish', [EVENT_STATUS.CANCELLED]: 'cancel' };
    const action = labels[newStatus] || 'update';
    if (!window.confirm(`Are you sure you want to ${action} this event?`)) return;
    setStatusError(null);
    try {
      await updateStatus.mutateAsync({ id, status: newStatus });
      showSuccessToast(`Event ${action === 'publish' ? 'published' : `${action}led`}`);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to update status';
      setStatusError(msg);
      showErrorToast(msg);
    }
  };

  const columns = [
    {
      key: 'applicantInfo',
      label: 'Applicant',
      render: (_v, row) => (
        <div>
          <p className="font-medium text-gray-900">{getApplicantName(row)}</p>
          <p className="text-xs text-gray-500">{getApplicantEmail(row)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: v => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getVolunteerStatusColor(v)}`}
        >
          {VOLUNTEER_STATUS_LABELS[v] || v || '—'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Applied',
      render: v => (v ? new Date(v).toLocaleString() : '—'),
    },
  ];

  const actions = [
    {
      component: ViewButton,
      onClick: row => navigate(`/admin/events/${id}/volunteers/${row._id}`),
      title: 'View',
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    );

  if (errMsg || !event)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/events')}
        >
          Back to events
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
          {errMsg || 'Event not found.'}
        </div>
      </div>
    );

  return (
    <AdminEventDetailLayout
      event={event}
      eventId={id}
      onBack={() => navigate('/admin/events')}
      onEdit={() => navigate(`/admin/events/${id}/edit`)}
      canPublish={event.status === EVENT_STATUS.DRAFT}
      canCancel={event.status === EVENT_STATUS.DRAFT || event.status === EVENT_STATUS.PUBLISHED}
      onPublish={() => handleStatusChange(EVENT_STATUS.PUBLISHED)}
      onCancel={() => handleStatusChange(EVENT_STATUS.CANCELLED)}
      isUpdatingStatus={updateStatus.isPending}
      showPaidTicketWarning={showPaidTicketWarning}
      statusError={statusError}
    >
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Volunteer applications</h2>

        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich"
          >
            {STATUS_OPTIONS.map(o => (
              <option key={o.value || 'all'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {applicationsErrMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">
            {applicationsErrMsg}
          </div>
        )}

        {applicationsLoading ? (
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
    </AdminEventDetailLayout>
  );
};

export default AdminEventVolunteers;
