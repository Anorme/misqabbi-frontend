import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import DynamicEventForm from '../../components/events/DynamicEventForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  useAdminEvent,
  useAdminVolunteerApplication,
  useAdminEventVolunteerForm,
} from '../../hooks/queries/useAdmin';
import { useUpdateAdminVolunteerApplication } from '../../hooks/mutations/useEventMutations';
import { VOLUNTEER_STATUS, VOLUNTEER_STATUS_LABELS } from '../../constants/events';
import { getVolunteerStatusColor } from '../../utils/events/statusBadges';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const getApplicantField = (application, field) =>
  application?.applicantInfo?.[field] ||
  (field === 'name'
    ? application?.user?.displayName
    : field === 'email'
      ? application?.user?.email
      : field === 'phone'
        ? application?.user?.contact?.phone
        : '') ||
  '—';

const AdminEventVolunteerDetail = () => {
  const { id, applicationId } = useParams();
  const navigate = useNavigate();
  const updateApplication = useUpdateAdminVolunteerApplication();
  const [actionError, setActionError] = useState(null);

  const { data: eventData, isLoading: eventLoading } = useAdminEvent(id);
  const event = eventData?.data || null;

  const {
    data: applicationData,
    isLoading: applicationLoading,
    isError,
    error,
  } = useAdminVolunteerApplication(id, applicationId);

  const { data: formData, isLoading: formLoading } = useAdminEventVolunteerForm(id);

  const application = applicationData?.data || null;
  const formSchema = formData?.data || null;

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load application'
    : null;

  const loading = eventLoading || applicationLoading;
  const isPending = application?.status === VOLUNTEER_STATUS.PENDING;

  const handleStatusUpdate = async newStatus => {
    const action = newStatus === VOLUNTEER_STATUS.ACCEPTED ? 'accept' : 'reject';
    if (!window.confirm(`Are you sure you want to ${action} this volunteer application?`)) return;

    setActionError(null);
    try {
      await updateApplication.mutateAsync({ eventId: id, applicationId, status: newStatus });
      showSuccessToast(`Application ${action === 'accept' ? 'accepted' : 'rejected'}`);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || `Failed to ${action} application`;
      setActionError(msg);
      showErrorToast(msg);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    );

  if (errMsg || !application)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}/volunteers`)}
        >
          Back to volunteers
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
          {errMsg || 'Application not found.'}
        </div>
      </div>
    );

  const shortAppId = application._id ? `#${String(application._id).slice(-6)}` : '—';

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}/volunteers`)}
        >
          Back to volunteers
        </button>
        {event && (
          <Link
            to={`/admin/events/${id}`}
            className="text-sm text-msq-purple-rich hover:opacity-80"
          >
            View event: {event.name}
          </Link>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Application {shortAppId}
        </h1>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getVolunteerStatusColor(application.status)}`}
        >
          {VOLUNTEER_STATUS_LABELS[application.status] || application.status}
        </span>
      </div>

      {actionError && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">{actionError}</div>
      )}

      {isPending && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={updateApplication.isPending}
            className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
            onClick={() => handleStatusUpdate(VOLUNTEER_STATUS.ACCEPTED)}
          >
            Accept application
          </button>
          <button
            type="button"
            disabled={updateApplication.isPending}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            onClick={() => handleStatusUpdate(VOLUNTEER_STATUS.REJECTED)}
          >
            Reject application
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 max-w-lg">
        <h3 className="font-medium text-gray-900 mb-3">Applicant information</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Name</dt>
            <dd className="text-gray-900">{getApplicantField(application, 'name')}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{getApplicantField(application, 'email')}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Phone</dt>
            <dd className="text-gray-900">{getApplicantField(application, 'phone')}</dd>
          </div>
          {application.user && (
            <div>
              <dt className="text-gray-500">Account</dt>
              <dd>
                <Link
                  to={`/admin/users/${application.user._id}`}
                  className="text-msq-purple-rich hover:opacity-80"
                >
                  {application.user.displayName || application.user.email || 'View user'}
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Form responses</h3>
        {formLoading ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner size={32} />
          </div>
        ) : (
          <DynamicEventForm
            formSchema={formSchema}
            identityKey="applicantInfo"
            values={{
              applicantInfo: application.applicantInfo,
              formResponses: application.formResponses,
            }}
            readOnly
          />
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-500">
        <p>Applied: {new Date(application.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(application.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AdminEventVolunteerDetail;
