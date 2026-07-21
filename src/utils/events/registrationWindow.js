/**
 * Client-side registration window helpers.
 * Mirrors backend `eventRegistrationWindowLogic`: closed when now >= eventDate.
 */

export const REGISTRATION_CLOSED_MESSAGE = 'Registration for this event has closed';

/**
 * @param {{ eventDate?: string|Date }|null|undefined} event
 * @param {Date} [now]
 * @returns {boolean}
 */
export const isEventRegistrationOpen = (event, now = new Date()) => {
  if (!event?.eventDate) return false;

  const eventDate = event.eventDate instanceof Date ? event.eventDate : new Date(event.eventDate);
  if (Number.isNaN(eventDate.getTime())) return false;

  return now < eventDate;
};

/**
 * @param {{ eventDate?: string|Date }|null|undefined} event
 * @param {Date} [now]
 * @returns {boolean}
 */
export const isPastEvent = (event, now = new Date()) => !isEventRegistrationOpen(event, now);
