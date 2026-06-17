import { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import DynamicEventForm from '../../components/events/DynamicEventForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  useAdminEvent,
  useAdminEventAttendee,
  useAdminEventRegistrationForm,
} from '../../hooks/queries/useAdmin';
import { EVENT_TYPE, REGISTRATION_STATUS_LABELS } from '../../constants/events';
import { getRegistrationStatusColor } from '../../utils/events/statusBadges';
import { pesewasToGhs } from '../../utils/events';
import { formatCurrency } from '../../utils/admin/tableHelpers';

const getGuestField = (registration, field) =>
  registration?.guestInfo?.[field] ||
  (field === 'name'
    ? registration?.user?.displayName
    : field === 'email'
      ? registration?.user?.email
      : field === 'phone'
        ? registration?.user?.contact?.phone
        : '') ||
  '—';

const AdminEventAttendeeDetail = () => {
  const { id, registrationId } = useParams();
  const navigate = useNavigate();

  const { data: eventData, isLoading: eventLoading } = useAdminEvent(id);
  const event = eventData?.data || null;

  const {
    data: registrationData,
    isLoading: registrationLoading,
    isError,
    error,
  } = useAdminEventAttendee(id, registrationId);

  const { data: formData, isLoading: formLoading } = useAdminEventRegistrationForm(id);

  const registration = registrationData?.data || null;
  const formSchema = formData?.data || null;

  const ticketType = useMemo(() => {
    if (!registration?.ticketTypeId || !event?.ticketTypes?.length) return null;
    const ticketId = String(registration.ticketTypeId);
    return event.ticketTypes.find(t => String(t._id) === ticketId) || null;
  }, [registration?.ticketTypeId, event?.ticketTypes]);

  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load registration'
    : null;

  const loading = eventLoading || registrationLoading;

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    );

  if (errMsg || !registration)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}/attendees`)}
        >
          Back to attendees
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
          {errMsg || 'Registration not found.'}
        </div>
      </div>
    );

  const transaction = registration.transaction;
  const shortRegId = registration._id ? `#${String(registration._id).slice(-6)}` : '—';

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/events/${id}/attendees`)}
        >
          Back to attendees
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
          Registration {shortRegId}
        </h1>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getRegistrationStatusColor(registration.status)}`}
        >
          {REGISTRATION_STATUS_LABELS[registration.status] || registration.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Guest information</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="text-gray-900">{getGuestField(registration, 'name')}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-900">{getGuestField(registration, 'email')}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd className="text-gray-900">{getGuestField(registration, 'phone')}</dd>
            </div>
            {registration.user && (
              <div>
                <dt className="text-gray-500">Account</dt>
                <dd>
                  <Link
                    to={`/admin/users/${registration.user._id}`}
                    className="text-msq-purple-rich hover:opacity-80"
                  >
                    {registration.user.displayName || registration.user.email || 'View user'}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Ticket & payment</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Ticket type</dt>
              <dd className="text-gray-900">
                {ticketType?.name || (event?.type === EVENT_TYPE.FREE ? 'Free registration' : '—')}
              </dd>
            </div>
            {ticketType?.pricePesewas != null && (
              <div>
                <dt className="text-gray-500">Ticket price</dt>
                <dd className="text-gray-900">
                  {formatCurrency(pesewasToGhs(ticketType.pricePesewas))}
                </dd>
              </div>
            )}
            {transaction ? (
              <>
                <div>
                  <dt className="text-gray-500">Payment status</dt>
                  <dd className="text-gray-900 capitalize">{transaction.status || '—'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Amount</dt>
                  <dd className="text-gray-900">
                    {transaction.amount != null
                      ? formatCurrency(pesewasToGhs(transaction.amount))
                      : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Reference</dt>
                  <dd className="text-gray-900 break-all font-mono text-xs">
                    {transaction.reference || '—'}
                  </dd>
                </div>
              </>
            ) : (
              <div>
                <dt className="text-gray-500">Payment</dt>
                <dd className="text-gray-900">No payment (free event)</dd>
              </div>
            )}
          </dl>
        </div>
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
            identityKey="guestInfo"
            values={{
              guestInfo: registration.guestInfo,
              formResponses: registration.formResponses,
            }}
            readOnly
          />
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-500">
        <p>Registered: {new Date(registration.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(registration.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AdminEventAttendeeDetail;
