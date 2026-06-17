/**
 * Format event date for display (date + time).
 * @param {string|Date} dateInput
 * @param {Intl.DateTimeFormatOptions} [options]
 */
export const formatEventDate = (dateInput, options = {}) => {
  if (!dateInput) return '—';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '—';

  const defaults = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };

  return date.toLocaleString('en-GH', { ...defaults, ...options });
};

/** Short date only (no time) */
export const formatEventDateShort = dateInput =>
  formatEventDate(dateInput, { weekday: undefined, hour: undefined, minute: undefined });

/** Format venue for display */
export const formatEventVenue = venue => {
  if (!venue) return null;
  const parts = [venue.name, venue.address].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
};
