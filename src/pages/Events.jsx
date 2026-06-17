import { useEffect, useMemo, useState } from 'react';

import ProductGrid from '../components/products/ProductGrid';
import EventCard from '../components/events/EventCard';
import PaginationLocal from '../components/orders/PaginationLocal';
import SEO from '../components/SEO';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useEvents } from '../hooks/queries/useEvents';
import { EVENT_TYPES, EVENT_TYPE_LABELS } from '../constants/events';
import scrollToTop from '../utils/scrollToTop';

const TYPE_OPTIONS = [
  { value: '', label: 'All events' },
  ...EVENT_TYPES.map(value => ({ value, label: EVENT_TYPE_LABELS[value] })),
];

const EVENTS_PER_PAGE = 12;

const Events = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    setPage(1);
  }, [q, type]);

  const params = { page, limit: EVENTS_PER_PAGE };
  if (q.trim()) params.q = q.trim();
  if (type) params.type = type;

  const { data, isLoading, isFetching, isError, error, refetch } = useEvents(params);

  const events = useMemo(() => data?.data || [], [data?.data]);
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const isGridLoading = isLoading || isFetching;
  const isSearching = Boolean(q.trim() || type);
  const errMsg = isError
    ? error?.response?.data?.error || error?.message || 'Failed to load events'
    : null;

  useEffect(() => {
    if (!isGridLoading && data) {
      scrollToTop();
    }
  }, [isGridLoading, data]);

  const eventCards = useMemo(
    () => events.map(event => <EventCard key={event._id} event={event} />),
    [events]
  );

  return (
    <>
      <SEO
        title="Events"
        description="Discover upcoming Misqabbi events — workshops, meetups, and exclusive experiences."
        canonicalPath="/events"
      />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bebas text-msq-purple-rich">Upcoming Events</h1>
          <p className="text-gray-600 mt-2">
            Join us for workshops, gatherings, and experiences designed with you in mind.
          </p>
        </div>

        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="search"
              placeholder="Search events"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich focus:border-msq-purple-rich"
            />
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-msq-purple-rich focus:border-msq-purple-rich"
            >
              {TYPE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isGridLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size={48} />
          </div>
        ) : errMsg ? (
          <div className="p-4 rounded-md border border-red-200 bg-red-50 text-red-700">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm">{errMsg}</span>
              <button
                type="button"
                onClick={() => refetch()}
                className="text-sm font-medium underline hover:opacity-80 shrink-0"
              >
                Retry
              </button>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center border border-gray-200 rounded-lg bg-white">
            <div className="text-lg font-medium text-gray-900">No events found</div>
            <p className="mt-2 text-sm text-gray-600">
              {isSearching
                ? 'Try adjusting your search or filters.'
                : 'Check back soon for upcoming events.'}
            </p>
          </div>
        ) : (
          <>
            {isSearching && (
              <div className="mb-4 text-center">
                <p className="text-gray-600">
                  {events.length} result{events.length !== 1 ? 's' : ''} on this page
                  {q.trim() && ` for "${q.trim()}"`}
                </p>
              </div>
            )}
            <ProductGrid>{eventCards}</ProductGrid>
            {totalPages > 1 && (
              <PaginationLocal
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage(p => Math.max(1, p - 1))}
                onNext={() => setPage(p => Math.min(totalPages, p + 1))}
              />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Events;
