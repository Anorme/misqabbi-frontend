/** Persisted before Paystack redirect so PaymentCallback can route to the event confirmation page. */
export const EVENT_CHECKOUT_SLUG_KEY = 'misqabbi_event_checkout_slug';

/**
 * Resolve event slug after Paystack verify for event_ticket transactions.
 * Backend may return eventRegistration.event as an ObjectId; checkout stores slug in sessionStorage.
 *
 * @param {Object|null} transaction
 * @param {Object|null} eventRegistration
 * @returns {string|null}
 */
export const resolveEventCheckoutSlug = (transaction, eventRegistration) => {
  const eventRef = eventRegistration?.event;
  if (eventRef && typeof eventRef === 'object' && eventRef.slug) {
    return eventRef.slug;
  }

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(EVENT_CHECKOUT_SLUG_KEY);
    if (stored) {
      sessionStorage.removeItem(EVENT_CHECKOUT_SLUG_KEY);
      return stored;
    }
  }

  return null;
};

/**
 * Determine post-verify redirect path from payment verify API response.
 *
 * @param {Object} verifyResponse - { data: { transaction, order, eventRegistration } }
 * @returns {{ type: 'order', orderId: string } | { type: 'event_ticket', slug: string, reference: string } | { type: 'error', message: string }}
 */
export const getPaymentCallbackDestination = (verifyResponse, reference) => {
  const transaction = verifyResponse?.data?.transaction;
  const orderId = verifyResponse?.data?.order?._id || verifyResponse?.data?.order;
  const eventRegistration = verifyResponse?.data?.eventRegistration;

  if (!transaction) {
    return { type: 'error', message: 'Transaction not found after payment' };
  }

  if (transaction.purpose === 'event_ticket') {
    const slug = resolveEventCheckoutSlug(transaction, eventRegistration);
    if (!slug) {
      return {
        type: 'error',
        message: 'Could not determine which event this payment belongs to.',
      };
    }
    return { type: 'event_ticket', slug, reference };
  }

  if (!orderId) {
    return { type: 'error', message: 'Order not found after payment' };
  }

  return { type: 'order', orderId: String(orderId) };
};
