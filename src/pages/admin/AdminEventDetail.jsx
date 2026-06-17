import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import AdminEventDetailLayout from '../../components/admin/AdminEventDetailLayout';
import { useAdminEvent } from '../../hooks/queries/useAdmin';
import { useUpdateAdminEventStatus } from '../../hooks/mutations/useEventMutations';
import {
  EVENT_STATUS,
  EVENT_TYPE,
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
} from '../../constants/events';
import {
  formatEventDate,
  formatEventVenue,
  getEventStatusColor,
  getEventTypeColor,
} from '../../utils/events';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminEventDetail = () => {
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

  const venueLabel = formatEventVenue(event.venue);

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {event.banner?.url && (
          <div className="lg:col-span-3">
            <img
              src={event.banner.url}
              alt={event.name}
              className="w-full max-h-64 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
          <div
            className="prose prose-sm max-w-none text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Date</dt>
              <dd className="font-medium text-gray-900">{formatEventDate(event.eventDate)}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Capacity</dt>
              <dd className="font-medium text-gray-900">{event.maxAttendees}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Type</dt>
              <dd>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}
                >
                  {EVENT_TYPE_LABELS[event.type]}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventStatusColor(event.status)}`}
                >
                  {EVENT_STATUS_LABELS[event.status]}
                </span>
              </dd>
            </div>
            {venueLabel && (
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Venue</dt>
                <dd className="font-medium text-gray-900">
                  {venueLabel}
                  {event.venue?.url && (
                    <>
                      {' · '}
                      <a
                        href={event.venue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-msq-purple-rich hover:underline"
                      >
                        Map link
                      </a>
                    </>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {event.type === EVENT_TYPE.PAID && (
              <li>
                Ticket types: {ticketTypes.length} configured
                {hasActiveTickets ? ' (active tickets available)' : ' (none active yet)'}
              </li>
            )}
            <li>Use the tabs above to manage tickets, forms, attendees, and volunteers.</li>
          </ul>
        </div>
      </div>
    </AdminEventDetailLayout>
  );
};

export default AdminEventDetail;
