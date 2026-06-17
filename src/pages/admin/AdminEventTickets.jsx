import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import AdminEventDetailLayout from '../../components/admin/AdminEventDetailLayout';
import EventTicketTypesPanel from '../../components/admin/EventTicketTypesPanel';
import { useAdminEvent } from '../../hooks/queries/useAdmin';
import { useUpdateAdminEventStatus } from '../../hooks/mutations/useEventMutations';
import { EVENT_STATUS, EVENT_TYPE } from '../../constants/events';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminEventTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateStatus = useUpdateAdminEventStatus();
  const [statusError, setStatusError] = useState(null);

  const { data: eventData, isLoading, isError, error } = useAdminEvent(id);
  const event = eventData?.data || null;

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load event'
    : null;

  const ticketTypes = event?.ticketTypes || [];
  const hasActiveTickets = ticketTypes.some(t => t.isActive);
  const showPaidTicketWarning =
    event?.type === EVENT_TYPE.PAID && event?.status === EVENT_STATUS.DRAFT && !hasActiveTickets;

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

  if (event.type !== EVENT_TYPE.PAID) {
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}`)}
        >
          Back to event
        </button>
        <p className="text-gray-600">Ticket types are only available for paid events.</p>
      </div>
    );
  }

  return (
    <AdminEventDetailLayout
      event={event}
      eventId={id}
      onEdit={() => navigate(`/admin/events/${id}/edit`)}
      canPublish={event.status === EVENT_STATUS.DRAFT}
      canCancel={event.status === EVENT_STATUS.DRAFT || event.status === EVENT_STATUS.PUBLISHED}
      onPublish={() => handleStatusChange(EVENT_STATUS.PUBLISHED)}
      onCancel={() => handleStatusChange(EVENT_STATUS.CANCELLED)}
      isUpdatingStatus={updateStatus.isPending}
      showPaidTicketWarning={showPaidTicketWarning}
      statusError={statusError}
    >
      <EventTicketTypesPanel eventId={id} ticketTypes={ticketTypes} />
    </AdminEventDetailLayout>
  );
};

export default AdminEventTickets;
