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
          </aside>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
