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
