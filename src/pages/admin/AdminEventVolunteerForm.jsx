import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import AdminEventDetailLayout from '../../components/admin/AdminEventDetailLayout';
import EventFormBuilder from '../../components/admin/EventFormBuilder';
import { useAdminEvent, useAdminEventVolunteerForm } from '../../hooks/queries/useAdmin';
import {
  useUpdateAdminEventStatus,
  useUpsertAdminVolunteerForm,
} from '../../hooks/mutations/useEventMutations';
import { EVENT_STATUS, EVENT_TYPE } from '../../constants/events';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminEventVolunteerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateStatus = useUpdateAdminEventStatus();
  const upsertForm = useUpsertAdminVolunteerForm();
  const [statusError, setStatusError] = useState(null);

  const { data: eventData, isLoading, isError, error } = useAdminEvent(id);
  const event = eventData?.data || null;

  const {
    data: formData,
    isLoading: formLoading,
    isError: formIsError,
    error: formError,
  } = useAdminEventVolunteerForm(id);

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load event'
    : null;

  const formLoadError = formIsError
    ? formError?.response?.data?.error || formError?.message || 'Failed to load volunteer form'
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
      <EventFormBuilder
        title="Volunteer form"
        description="Configure the fields applicants fill out when applying to volunteer."
        identityKey="applicantInfo"
        initialSchema={formData?.data}
        isLoading={formLoading}
        loadError={formLoadError}
        isSaving={upsertForm.isPending}
        onSave={schema => upsertForm.mutateAsync({ id, formSchema: schema })}
      />
    </AdminEventDetailLayout>
  );
};

export default AdminEventVolunteerForm;
