import { describe, expect, test } from 'vitest';

import { buildEventFormData } from '../src/api/adminEvents';

describe('buildEventFormData', () => {
  test('appends a selected banner file once', () => {
    const banner = new File(['banner'], 'banner.png', { type: 'image/png' });
    const formData = buildEventFormData({ maxAttendees: 50 }, banner);

    expect(formData.getAll('banner')).toEqual([banner]);
  });

  test('does not append banner without a file, including banner null', () => {
    const formData = buildEventFormData({ banner: null, maxAttendees: 50 }, null);

    expect(formData.has('banner')).toBe(false);
  });

  test('appends maxAttendees as a numeric string', () => {
    const formData = buildEventFormData({ maxAttendees: 50 }, null);

    expect(formData.get('maxAttendees')).toBe('50');
  });

  test('skips empty or invalid maxAttendees values', () => {
    expect(buildEventFormData({ maxAttendees: '' }, null).has('maxAttendees')).toBe(false);
    expect(buildEventFormData({ maxAttendees: Number.NaN }, null).has('maxAttendees')).toBe(false);
  });

  test('omits venue fields when they are empty', () => {
    const formData = buildEventFormData(
      { venue: { name: '', address: '   ', url: '' }, maxAttendees: 50 },
      null
    );

    expect(Array.from(formData.keys()).some(key => key.startsWith('venue['))).toBe(false);
  });

  test('appends only non-empty venue fields with bracket notation', () => {
    const formData = buildEventFormData(
      { venue: { name: 'Misqabbi Studio', address: '', url: 'https://maps.example.com' } },
      null
    );

    expect(formData.get('venue[name]')).toBe('Misqabbi Studio');
    expect(formData.has('venue[address]')).toBe(false);
    expect(formData.get('venue[url]')).toBe('https://maps.example.com');
    expect(formData.has('venue')).toBe(false);
  });
});
