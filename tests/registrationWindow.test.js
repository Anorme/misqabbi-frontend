import { describe, expect, test } from 'vitest';

import { isEventRegistrationOpen, isPastEvent } from '../src/utils/events/registrationWindow';

describe('registrationWindow', () => {
  const eventDate = '2026-08-01T18:00:00.000Z';
  const event = { eventDate };

  test('is open when now is before eventDate', () => {
    expect(isEventRegistrationOpen(event, new Date('2026-08-01T17:59:59.999Z'))).toBe(true);
    expect(isPastEvent(event, new Date('2026-08-01T17:59:59.999Z'))).toBe(false);
  });

  test('is closed when now equals or is after eventDate', () => {
    expect(isEventRegistrationOpen(event, new Date(eventDate))).toBe(false);
    expect(isPastEvent(event, new Date('2026-08-01T18:00:00.001Z'))).toBe(true);
  });

  test('is closed when eventDate is missing or invalid', () => {
    expect(isEventRegistrationOpen({}, new Date(eventDate))).toBe(false);
    expect(isEventRegistrationOpen({ eventDate: 'not-a-date' }, new Date(eventDate))).toBe(false);
    expect(isEventRegistrationOpen(null, new Date(eventDate))).toBe(false);
  });
});
