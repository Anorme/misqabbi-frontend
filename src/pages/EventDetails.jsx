import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Calendar, MapPin, Users } from 'lucide-react';

import SEO from '../components/SEO';
import EventRegistrationPanel from '../components/events/EventRegistrationPanel';
import EventTicketCheckout from '../components/events/EventTicketCheckout';
import EventVolunteerPanel from '../components/events/EventVolunteerPanel';
import NotFound from '../components/ui/NotFound';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useEvent } from '../hooks/queries/useEvents';
import { EVENT_TYPE, EVENT_TYPE_LABELS } from '../constants/events';
import { formatEventDate, formatEventVenue, getEventTypeColor } from '../utils/events';
import scrollToTop from '../utils/scrollToTop';

const getSpotsLabel = spotsRemaining => {
  if (spotsRemaining == null) return null;
  if (spotsRemaining <= 0) return 'Full';
  return `${spotsRemaining} spot${spotsRemaining !== 1 ? 's' : ''} remaining`;
};

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useEvent(slug);

  const event = data?.data || null;

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
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 flex justify-center">
              <span
                className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}
              >
                {EVENT_TYPE_LABELS[event.type] || event.type}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bebas text-msq-purple-rich">{event.name}</h1>
          </div>

          {event.banner?.url && (
            <img
              src={event.banner.url}
              alt={event.name}
              className="block w-full h-auto rounded-xl shadow-sm"
            />
          )}

          <div className="space-y-6">
            <div
              className={`grid justify-items-center gap-4 text-center text-sm text-gray-700 sm:items-center sm:text-left ${
                venueLabel ? 'sm:grid-cols-2' : ''
              }`}
            >
              <div className="space-y-3">
                <p className="flex items-start justify-center gap-2 sm:justify-start">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{formatEventDate(event.eventDate)}</span>
                </p>
                {spotsLabel && (
                  <p className="flex items-center justify-center gap-2 font-medium text-msq-purple-deep sm:justify-start">
                    <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{spotsLabel}</span>
                  </p>
                )}
              </div>

              {venueLabel && (
                <p className="flex items-start justify-center gap-2 sm:justify-self-end">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block">{venueLabel}</span>
                    {venueLink && (
                      <a
                        href={venueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-msq-purple-rich hover:underline"
                      >
                        View location
                      </a>
                    )}
                  </span>
                </p>
              )}
            </div>

            {event.description && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">About this event</h2>
                <section className="rounded-xl bg-msq-purple-rich/5 px-5 py-5 sm:px-6">
                  <div className="border-l-2 border-msq-purple-rich/30 pl-4">
                    <div
                      className="rich-text-content max-w-3xl text-gray-700 [&_a]:text-msq-purple-rich [&_a]:underline [&_strong]:text-gray-900"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </div>
                </section>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {isFree && (
              <EventRegistrationPanel
                event={event}
                onSuccess={(registration, payload) => {
                  navigate(`/events/${event.slug}/confirmation`, {
                    state: {
                      registrationSummary: {
                        type: 'free',
                        event: {
                          name: event.name,
                          slug: event.slug,
                          eventDate: event.eventDate,
                          venue: event.venue,
                        },
                        guestInfo: payload.guestInfo,
                        registration,
                      },
                    },
                  });
                }}
              />
            )}

            {isPaid && <EventTicketCheckout event={event} />}

            {hasVolunteerForm && <EventVolunteerPanel event={event} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
