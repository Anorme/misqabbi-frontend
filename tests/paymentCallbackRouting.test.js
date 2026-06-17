import { describe, expect, it, beforeEach, vi } from 'vitest';

import {
  EVENT_CHECKOUT_SLUG_KEY,
  getPaymentCallbackDestination,
  resolveEventCheckoutSlug,
} from '../src/utils/events/paymentCallbackRouting';

describe('resolveEventCheckoutSlug', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns slug from populated eventRegistration.event', () => {
    const slug = resolveEventCheckoutSlug(null, {
      event: { slug: 'summer-gala' },
    });
    expect(slug).toBe('summer-gala');
  });

  it('falls back to sessionStorage and clears the key', () => {
    sessionStorage.setItem(EVENT_CHECKOUT_SLUG_KEY, 'stored-event');
    const slug = resolveEventCheckoutSlug(null, null);
    expect(slug).toBe('stored-event');
    expect(sessionStorage.getItem(EVENT_CHECKOUT_SLUG_KEY)).toBeNull();
  });
});

describe('getPaymentCallbackDestination', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal('window', globalThis);
  });

  it('routes order payments to order detail', () => {
    const destination = getPaymentCallbackDestination(
      {
        data: {
          transaction: { purpose: 'order', status: 'success' },
          order: 'order-123',
        },
      },
      'ref-order'
    );
    expect(destination).toEqual({ type: 'order', orderId: 'order-123' });
  });

  it('routes event_ticket payments to event confirmation', () => {
    sessionStorage.setItem(EVENT_CHECKOUT_SLUG_KEY, 'charity-run');
    const destination = getPaymentCallbackDestination(
      {
        data: {
          transaction: { purpose: 'event_ticket', status: 'success' },
          eventRegistration: { _id: 'reg-1' },
          order: null,
        },
      },
      'ref-event'
    );
    expect(destination).toEqual({
      type: 'event_ticket',
      slug: 'charity-run',
      reference: 'ref-event',
    });
  });

  it('returns error when event slug cannot be resolved', () => {
    const destination = getPaymentCallbackDestination(
      {
        data: {
          transaction: { purpose: 'event_ticket', status: 'success' },
          eventRegistration: { event: '507f1f77bcf86cd799439011' },
        },
      },
      'ref-event'
    );
    expect(destination.type).toBe('error');
  });
});
