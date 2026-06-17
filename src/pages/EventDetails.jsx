import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Calendar, MapPin, Users } from 'lucide-react';

import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import NotFound from '../components/ui/NotFound';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useEvent } from '../hooks/queries/useEvents';
import { EVENT_TYPE, EVENT_TYPE_LABELS } from '../constants/events';
import { formatCurrency } from '../utils/admin/tableHelpers';
import {
  formatEventDate,
  formatEventVenue,
  getEventTypeColor,
  pesewasToGhs,
} from '../utils/events';
import scrollToTop from '../utils/scrollToTop';

const getSpotsLabel = spotsRemaining => {
  if (spotsRemaining == null) return null;
  if (spotsRemaining <= 0) return 'Full';
  return `${spotsRemaining} spot${spotsRemaining !== 1 ? 's' : ''} remaining`;
};

const EventDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useEvent(slug);

  const event = data?.data || null;

  const activeTickets = useMemo(
    () => (event?.ticketTypes || []).filter(t => t.isActive),
    [event?.ticketTypes]
  );

  useEffect(() => {
    if (!isLoading && event) {
      scrollToTop();
    }
  }, [isLoading, event]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const isNotFound = isError && (error?.response?.status === 404 || !event);
  if (isNotFound) return <NotFound />;

  if (isError) {
    const errMsg = error?.response?.data?.error || error?.message || 'Failed to load event';
    return (
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm">
          {errMsg}
        </div>
        <Link
          to="/events"
          className="inline-block mt-4 text-sm text-msq-purple-rich hover:underline"
        >
          Back to events
        </Link>
      </main>
    );
  }

  if (!event) return <NotFound />;

  const venueLabel = formatEventVenue(event.venue);
  const venueLink = event.venue?.url || event.venue?.link;
  const spotsLabel = getSpotsLabel(event.spotsRemaining);
  const isFree = event.type === EVENT_TYPE.FREE;
  const isPaid = event.type === EVENT_TYPE.PAID;
  const hasVolunteerForm = Boolean(event.volunteerForm);

  return (
    <>
      <SEO
        title={event.name}
        description={
          event.description
            ? event.description.replace(/<[^>]+>/g, '').slice(0, 160)
            : `Join us for ${event.name} at Misqabbi.`
        }
        canonicalPath={`/events/${event.slug}`}
        image={event.banner?.url}
        type="article"
      />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Link
          to="/events"
          className="inline-block mb-6 text-sm text-msq-purple-rich hover:underline"
        >
          ← Back to events
        </Link>

        {event.banner?.url && (
          <div className="mb-6">
            <img
              src={event.banner.url}
              alt={event.name}
              className="w-full max-h-80 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bebas text-msq-purple-rich">
                  {event.name}
                </h1>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}
                >
                  {EVENT_TYPE_LABELS[event.type] || event.type}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{formatEventDate(event.eventDate)}</span>
                </p>
                {venueLabel && (
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      {venueLabel}
                      {venueLink && (
                        <>
                          {' · '}
                          <a
                            href={venueLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-msq-purple-rich hover:underline"
                          >
                            View location
                          </a>
                        </>
                      )}
                    </span>
                  </p>
                )}
                {spotsLabel && (
                  <p className="flex items-center gap-2 font-medium text-msq-purple-deep">
                    <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{spotsLabel}</span>
                  </p>
                )}
              </div>
            </div>

            {event.description && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About this event</h2>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {isFree && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Registration</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Reserve your spot for this free event. Online registration opens soon.
                </p>
                <Button variant="primary" className="w-full px-4 py-3 text-sm" disabled>
                  Coming soon
                </Button>
              </section>
            )}

            {isPaid && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets</h2>
                {activeTickets.length === 0 ? (
                  <p className="text-sm text-gray-500">Tickets are not available yet.</p>
                ) : (
                  <ul className="space-y-3 mb-4">
                    {activeTickets.map(ticket => {
                      const soldOut = ticket.remainingQuantity === 0;
                      return (
                        <li
                          key={ticket._id}
                          className={`rounded-lg border p-4 ${soldOut ? 'border-gray-200 bg-gray-50 opacity-75' : 'border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-gray-900">{ticket.name}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {formatCurrency(pesewasToGhs(ticket.pricePesewas))}
                              </p>
                            </div>
                            {soldOut && (
                              <span className="shrink-0 inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                                Sold out
                              </span>
                            )}
                          </div>
                          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div>
                              <dt className="text-gray-500">Available</dt>
                              <dd className="font-medium text-gray-800">
                                {ticket.remainingQuantity ?? 0}
                              </dd>
                            </div>
                            {ticket.expiresAt && (
                              <div>
                                <dt className="text-gray-500">Sales end</dt>
                                <dd className="font-medium text-gray-800">
                                  {formatEventDate(ticket.expiresAt)}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <Button variant="primary" className="w-full px-4 py-3 text-sm" disabled>
                  Coming soon
                </Button>
              </section>
            )}

            {hasVolunteerForm && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Volunteer</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Interested in helping out? Volunteer applications open soon.
                </p>
                <Button variant="ghost" className="w-full px-4 py-3 text-sm" disabled>
                  Coming soon
                </Button>
              </section>
            )}
          </aside>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
