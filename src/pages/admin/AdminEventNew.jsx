import { useState } from 'react';
import { useNavigate } from 'react-router';
import EventForm from '../../components/admin/EventForm';
import { useCreateAdminEvent } from '../../hooks/mutations/useEventMutations';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminEventNew = () => {
  const navigate = useNavigate();
  const createEvent = useCreateAdminEvent();
  const [error, setError] = useState(null);

  const handleSubmit = async ({ data, bannerFile }) => {
    setError(null);
    try {
      const res = await createEvent.mutateAsync({ data, bannerFile });
      showSuccessToast('Event created');
      const id = res?.data?._id;
      if (id) navigate(`/admin/events/${id}`);
      else navigate('/admin/events');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to create event';
      setError(msg);
      showErrorToast(msg);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Create event
        </h1>
        <button
          type="button"
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/events')}
        >
          Back to list
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <EventForm onSubmit={handleSubmit} isLoading={createEvent.isPending} error={error} />
      </div>
    </div>
  );
};

export default AdminEventNew;
