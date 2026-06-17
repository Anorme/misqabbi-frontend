import {
  EVENT_STATUS,
  EVENT_TYPE,
  REGISTRATION_STATUS,
  VOLUNTEER_STATUS,
} from '../../constants/events';

const STATUS_COLORS = {
  [EVENT_STATUS.DRAFT]: 'bg-gray-100 text-gray-800',
  [EVENT_STATUS.PUBLISHED]: 'bg-emerald-100 text-emerald-800',
  [EVENT_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
  [EVENT_TYPE.FREE]: 'bg-blue-100 text-blue-800',
  [EVENT_TYPE.PAID]: 'bg-purple-100 text-purple-800',
  [REGISTRATION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [REGISTRATION_STATUS.CONFIRMED]: 'bg-emerald-100 text-emerald-800',
  [REGISTRATION_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
  [VOLUNTEER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [VOLUNTEER_STATUS.ACCEPTED]: 'bg-emerald-100 text-emerald-800',
  [VOLUNTEER_STATUS.REJECTED]: 'bg-red-100 text-red-800',
};

/** Tailwind classes for event/status badges */
export const getEventStatusColor = status => STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

export const getEventTypeColor = type => STATUS_COLORS[type] || 'bg-gray-100 text-gray-800';

export const getRegistrationStatusColor = status =>
  STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

export const getVolunteerStatusColor = status =>
  STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
