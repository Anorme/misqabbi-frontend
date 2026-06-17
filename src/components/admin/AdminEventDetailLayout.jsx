import { NavLink } from 'react-router';
import { EVENT_TYPE_LABELS, EVENT_STATUS_LABELS, EVENT_TYPE } from '../../constants/events';
import { getEventStatusColor, getEventTypeColor } from '../../utils/events';

export const DETAIL_TABS = [
  { key: 'overview', label: 'Overview', path: '' },
  { key: 'tickets', label: 'Tickets', path: 'tickets', paidOnly: true },
  { key: 'registration-form', label: 'Registration Form', path: 'registration-form' },
  { key: 'volunteer-form', label: 'Volunteer Form', path: 'volunteer-form' },
  { key: 'attendees', label: 'Attendees', path: 'attendees' },
  { key: 'volunteers', label: 'Volunteers', path: 'volunteers', stub: true },
];

const AdminEventDetailLayout = ({
  event,
  eventId,
  onBack,
  onEdit,
  canPublish,
  canCancel,
  onPublish,
  onCancel,
  isUpdatingStatus,
  showPaidTicketWarning,
  statusError,
  children,
}) => {
  const visibleTabs = DETAIL_TABS.filter(tab => !tab.paidOnly || event.type === EVENT_TYPE.PAID);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <button
            className="mb-2 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={onBack}
          >
            Back to events
          </button>
          <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
            {event.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">/{event.slug}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={onEdit}
          >
            Edit
          </button>
          {canPublish && (
            <button
              type="button"
              disabled={isUpdatingStatus}
              className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
              onClick={onPublish}
            >
              Publish
            </button>
          )}
          {canCancel && (
            <button
              type="button"
              disabled={isUpdatingStatus}
              className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              onClick={onCancel}
            >
              Cancel event
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}
        >
          {EVENT_TYPE_LABELS[event.type]}
        </span>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventStatusColor(event.status)}`}
        >
          {EVENT_STATUS_LABELS[event.status]}
        </span>
      </div>

      {showPaidTicketWarning && (
        <div className="mb-4 p-3 rounded-md bg-amber-50 text-amber-800 text-sm border border-amber-200">
          This paid event has no active ticket types. Add at least one active ticket before
          publishing.
        </div>
      )}

      {statusError && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">{statusError}</div>
      )}

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {visibleTabs.map(tab => {
          const to = tab.path ? `/admin/events/${eventId}/${tab.path}` : `/admin/events/${eventId}`;
          return (
            <NavLink
              key={tab.key}
              to={to}
              end={!tab.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive ? 'bg-msq-purple-rich text-white' : 'text-gray-600 hover:bg-gray-100'
                } ${tab.stub ? 'opacity-60 pointer-events-none' : ''}`
              }
            >
              {tab.label}
            </NavLink>
          );
        })}
      </nav>

      {children}
    </div>
  );
};

export default AdminEventDetailLayout;
