import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router';
import { Calendar, CheckCircle2, MapPin, XCircle } from 'lucide-react';

import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import NotFound from '../components/ui/NotFound';
import { verifyPayment } from '../api/payments';
import { useEvent } from '../hooks/queries/useEvents';
import { formatCurrency } from '../utils/admin/tableHelpers';
import { formatEventDate, formatEventVenue, pesewasToGhs } from '../utils/events';

const isSuccessfulTransaction = transaction =>
  transaction?.status === 'success' || transaction?.status === 'paid';

const isFailedTransaction = transaction =>
  transaction?.status === 'failed' || transaction?.status === 'abandoned';

/**
 * Event registration confirmation — paid (verify by reference) or free (location.state from RSVP).
 */
const EventConfirmation = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const freeSummary = location.state?.registrationSummary;
  const reference = searchParams.get('reference');
  const isPaidFlow = Boolean(reference);

  const { data: eventData } = useEvent(slug, {
    enabled: isPaidFlow && Boolean(slug),
  });
  const eventFromQuery = eventData?.data || null;

  const [paidState, setPaidState] = useState({
    loading: isPaidFlow,
    error: '',
    transaction: null,
    registration: null,
  });

  useEffect(() => {
    if (!isPaidFlow || !reference) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await verifyPayment(reference);
        if (cancelled) return;

        const transaction = res?.data?.transaction;
        const registration = res?.data?.eventRegistration;

        if (!transaction || transaction.purpose !== 'event_ticket') {
          setPaidState({
            loading: false,
            error: 'This payment reference is not for an event ticket.',
            transaction: null,
            registration: null,
          });
          return;
        }

        if (isFailedTransaction(transaction)) {
          setPaidState({
            loading: false,
            error: 'Payment was not completed. Your registration was not confirmed.',
            transaction,
            registration: null,
          });
          return;
        }

        if (!isSuccessfulTransaction(transaction) || !registration) {
          setPaidState({
            loading: false,
            error: 'Payment is still being processed. Please refresh in a moment.',
            transaction,
            registration: null,
          });
          return;
        }

        setPaidState({
          loading: false,
          error: '',
          transaction,
          registration,
        });
      } catch (error) {
        if (cancelled) return;
        setPaidState({
          loading: false,
          error: error?.message || 'Failed to verify payment.',
          transaction: null,
          registration: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isPaidFlow, reference]);

  const freeEvent = freeSummary?.type === 'free' ? freeSummary.event : null;

  const paidEvent = useMemo(() => {
    if (!paidState.registration && !eventFromQuery) return null;
    if (eventFromQuery) {
      return {
        name: eventFromQuery.name,
        slug: eventFromQuery.slug,
        eventDate: eventFromQuery.eventDate,
        venue: eventFromQuery.venue,
      };
    }
    return slug ? { name: slug, slug, eventDate: null, venue: null } : null;
  }, [eventFromQuery, paidState.registration, slug]);

  const paidTicketLabel = useMemo(() => {
    const purchase = paidState.transaction?.eventPurchaseData;
    if (!purchase?.ticketName) return null;
    const qty = purchase.quantity || 1;
    const unitPrice = purchase.pricePerTicket
      ? formatCurrency(pesewasToGhs(purchase.pricePerTicket))
      : null;
    return `${purchase.ticketName}${qty > 1 ? ` × ${qty}` : ''}${unitPrice ? ` — ${unitPrice} each` : ''}`;
  }, [paidState.transaction]);

  if (!isPaidFlow && !freeSummary) {
    return (
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <SEO title="Registration confirmation" robots="noindex,nofollow" />
        <div className="max-w-lg mx-auto text-center space-y-4">
          <XCircle className="w-12 h-12 text-gray-400 mx-auto" aria-hidden="true" />
          <h1 className="text-xl font-semibold text-gray-900">No registration found</h1>
          <p className="text-sm text-gray-600">
            This page is shown after a successful registration. If you just paid for tickets, use
            the link from your payment confirmation.
          </p>
          <Link to="/events">
            <Button variant="primary" className="px-6 py-2 text-sm">
              Browse events
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (isPaidFlow && paidState.loading) {
    return (
      <main className="w-full px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <SEO title="Confirming registration" robots="noindex,nofollow" />
        <LoadingSpinner size={48} />
      </main>
    );
  }

  if (isPaidFlow && paidState.error) {
    return (
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <SEO title="Registration not confirmed" robots="noindex,nofollow" />
        <div className="max-w-lg mx-auto space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" aria-hidden="true" />
            <h1 className="text-lg font-semibold text-red-800 mb-2">Registration not confirmed</h1>
            <p className="text-sm text-red-700">{paidState.error}</p>
            {reference && (
              <p className="text-xs text-red-600 mt-2 font-mono">Reference: {reference}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {slug && (
              <Link to={`/events/${slug}`}>
                <Button variant="primary" className="px-4 py-2 text-sm">
                  Back to event
                </Button>
              </Link>
            )}
            <Link to="/events">
              <Button variant="ghost" className="px-4 py-2 text-sm">
                All events
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayEvent = isPaidFlow ? paidEvent : freeEvent;
  const guestInfo = isPaidFlow ? paidState.registration?.guestInfo : freeSummary?.guestInfo;

  if (isPaidFlow && !displayEvent) {
    return <NotFound />;
  }

  const eventTitle = displayEvent?.name || 'Event';
  const venueLabel = formatEventVenue(displayEvent?.venue);

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={`Registration confirmed — ${eventTitle}`}
        description={`Your registration for ${eventTitle} is confirmed.`}
        robots="noindex,nofollow"
        canonicalPath={displayEvent?.slug ? `/events/${displayEvent.slug}/confirmation` : undefined}
      />

      <div className="max-w-lg mx-auto">
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" aria-hidden="true" />
            <div>
              <h1 className="text-xl font-semibold text-green-900 mb-1">You&apos;re registered!</h1>
              <p className="text-sm text-green-800">
                {isPaidFlow
                  ? 'Your payment was successful and your ticket registration is confirmed.'
                  : 'Your spot for this free event is confirmed.'}
              </p>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{eventTitle}</h2>

          {displayEvent?.eventDate && (
            <p className="flex items-start gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{formatEventDate(displayEvent.eventDate)}</span>
            </p>
          )}

          {venueLabel && (
            <p className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{venueLabel}</span>
            </p>
          )}

          {guestInfo && (guestInfo.name || guestInfo.email) && (
            <dl className="pt-2 border-t border-gray-100 text-sm space-y-1">
              <dt className="text-gray-500 font-medium">Registered as</dt>
              <dd className="text-gray-900">
                {[guestInfo.name, guestInfo.email].filter(Boolean).join(' · ')}
              </dd>
            </dl>
          )}

          {isPaidFlow && paidTicketLabel && (
            <dl className="pt-2 border-t border-gray-100 text-sm space-y-1">
              <dt className="text-gray-500 font-medium">Ticket</dt>
              <dd className="text-gray-900">{paidTicketLabel}</dd>
            </dl>
          )}

          {isPaidFlow && paidState.transaction?.amount != null && (
            <dl className="text-sm space-y-1">
              <dt className="text-gray-500 font-medium">Amount paid</dt>
              <dd className="text-gray-900">
                {formatCurrency(pesewasToGhs(paidState.transaction.amount))}
              </dd>
            </dl>
          )}

          {isPaidFlow && reference && (
            <p className="text-xs text-gray-500 font-mono pt-2">Payment reference: {reference}</p>
          )}
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          {displayEvent?.slug && (
            <Link to={`/events/${displayEvent.slug}`}>
              <Button variant="ghost" className="px-4 py-2 text-sm">
                View event
              </Button>
            </Link>
          )}
          <Link to="/events">
            <Button variant="primary" className="px-4 py-2 text-sm">
              Browse more events
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EventConfirmation;
