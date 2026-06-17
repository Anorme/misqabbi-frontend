import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import EventForm from '../../components/admin/EventForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAdminEvent } from '../../hooks/queries/useAdmin';
import { useUpdateAdminEvent } from '../../hooks/mutations/useEventMutations';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminEventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateEvent = useUpdateAdminEvent();
  const [error, setError] = useState(null);

  const { data: eventData, isLoading, isError, error: queryError } = useAdminEvent(id);
  const event = eventData?.data || null;
  const errMsg = isError
    ? queryError?.response?.data?.error || queryError?.message || 'Failed to load event'
    : null;

  const handleSubmit = async ({ data, bannerFile }) => {
    setError(null);
    try {
      await updateEvent.mutateAsync({ id, data, bannerFile });
      showSuccessToast('Event updated');
      navigate(`/admin/events/${id}`);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to update event';
      setError(msg);
      showErrorToast(msg);
    }
  };

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
          onClick={() => navigate('/admin/events')}
        >
          Back to list
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{errMsg}</div>
      </div>
    );

  if (!event)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/events')}
        >
          Back to list
        </button>
        <p className="text-gray-500">Event not found.</p>
      </div>
    );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Edit event: {event.name}
        </h1>
        <button
          type="button"
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}`)}
        >
          Back to detail
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <EventForm
          initialData={event}
          onSubmit={handleSubmit}
          isLoading={updateEvent.isPending}
          error={error}
        />
      </div>
    </div>
  );
};

export default AdminEventEdit;
