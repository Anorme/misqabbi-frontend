/** Event lifecycle status */
export const EVENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
};

export const EVENT_STATUSES = Object.values(EVENT_STATUS);

/** Event pricing model */
export const EVENT_TYPE = {
  FREE: 'free',
  PAID: 'paid',
};

export const EVENT_TYPES = Object.values(EVENT_TYPE);

/** Public events list time window filter */
export const EVENT_WHEN = {
  UPCOMING: 'upcoming',
  PAST: 'past',
  ALL: 'all',
};

export const EVENT_WHENS = Object.values(EVENT_WHEN);

/** Registration status after RSVP or checkout */
export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};

export const REGISTRATION_STATUSES = Object.values(REGISTRATION_STATUS);

/** Volunteer application review status */
export const VOLUNTEER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const VOLUNTEER_STATUSES = Object.values(VOLUNTEER_STATUS);

/** Custom form question types */
export const FORM_QUESTION_TYPE = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
};

export const FORM_QUESTION_TYPES = Object.values(FORM_QUESTION_TYPE);

/** Builtin identity fields on registration/volunteer forms */
export const BUILTIN_FORM_FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
};

export const BUILTIN_FORM_FIELDS = Object.values(BUILTIN_FORM_FIELD);

/** Labels for admin filters and UI */
export const EVENT_STATUS_LABELS = {
  [EVENT_STATUS.DRAFT]: 'Draft',
  [EVENT_STATUS.PUBLISHED]: 'Published',
  [EVENT_STATUS.CANCELLED]: 'Cancelled',
};

export const EVENT_TYPE_LABELS = {
  [EVENT_TYPE.FREE]: 'Free',
  [EVENT_TYPE.PAID]: 'Paid',
};

export const EVENT_WHEN_LABELS = {
  [EVENT_WHEN.UPCOMING]: 'Upcoming',
  [EVENT_WHEN.PAST]: 'Past',
  [EVENT_WHEN.ALL]: 'All',
};

export const EVENT_WHEN_HEADINGS = {
  [EVENT_WHEN.UPCOMING]: 'Upcoming Events',
  [EVENT_WHEN.PAST]: 'Past Events',
  [EVENT_WHEN.ALL]: 'All Events',
};

export const EVENT_WHEN_DESCRIPTIONS = {
  [EVENT_WHEN.UPCOMING]:
    'Moments made for her, workshops, gatherings, and soft little experiences worth showing up for.',
  [EVENT_WHEN.PAST]:
    "A look back at the moments we've shared, the laughs, the looks, the girlies who showed up.",
  [EVENT_WHEN.ALL]:
    "Every Misqabbi moment in one place, what's coming and the ones we'll always remember.",
};

export const EVENT_WHEN_EMPTY = {
  [EVENT_WHEN.UPCOMING]: {
    title: 'No upcoming events',
    body: "We're preparing something special. Check back soon.",
  },
  [EVENT_WHEN.PAST]: {
    title: 'No past events yet',
    body: 'Our first chapters are still being written.',
  },
  [EVENT_WHEN.ALL]: {
    title: 'Nothing to show just yet',
    body: 'New Misqabbi moments are on the way.',
  },
};

export const REGISTRATION_STATUS_LABELS = {
  [REGISTRATION_STATUS.PENDING]: 'Pending',
  [REGISTRATION_STATUS.CONFIRMED]: 'Confirmed',
  [REGISTRATION_STATUS.CANCELLED]: 'Cancelled',
};

export const VOLUNTEER_STATUS_LABELS = {
  [VOLUNTEER_STATUS.PENDING]: 'Pending',
  [VOLUNTEER_STATUS.ACCEPTED]: 'Accepted',
  [VOLUNTEER_STATUS.REJECTED]: 'Rejected',
};
