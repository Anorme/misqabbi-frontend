import { useEffect, useMemo, useState } from 'react';
import { Calendar, CalendarClock, CalendarDays } from 'lucide-react';

import ProductGrid from '../components/products/ProductGrid';
import EventCard from '../components/events/EventCard';
import PaginationLocal from '../components/orders/PaginationLocal';
import SEO from '../components/SEO';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useEvents } from '../hooks/queries/useEvents';
import {
  EVENT_TYPE_LABELS,
  EVENT_TYPES,
  EVENT_WHEN,
  EVENT_WHEN_DESCRIPTIONS,
  EVENT_WHEN_EMPTY,
  EVENT_WHEN_HEADINGS,
  EVENT_WHEN_LABELS,
} from '../constants/events';
import scrollToTop from '../utils/scrollToTop';

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  ...EVENT_TYPES.map(value => ({ value, label: EVENT_TYPE_LABELS[value] })),
];

const WHEN_OPTIONS = [
  { value: EVENT_WHEN.UPCOMING, icon: CalendarClock },
  { value: EVENT_WHEN.PAST, icon: Calendar },
  { value: EVENT_WHEN.ALL, icon: CalendarDays },
];

const EVENTS_PER_PAGE = 12;

const Events = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [when, setWhen] = useState(EVENT_WHEN.UPCOMING);

  useEffect(() => {
    setPage(1);
  }, [type, when]);

  const params = { page, limit: EVENTS_PER_PAGE, when };
  if (type) params.type = type;

  const { data, isLoading, isFetching, isError, error, refetch } = useEvents(params);

  const events = useMemo(() => data?.data || [], [data?.data]);
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const isGridLoading = isLoading || isFetching;
  const isFiltered = Boolean(type);
  const heading = EVENT_WHEN_HEADINGS[when] || EVENT_WHEN_HEADINGS[EVENT_WHEN.UPCOMING];
  const description = EVENT_WHEN_DESCRIPTIONS[when] || EVENT_WHEN_DESCRIPTIONS[EVENT_WHEN.UPCOMING];
  const emptyCopy = EVENT_WHEN_EMPTY[when] || EVENT_WHEN_EMPTY[EVENT_WHEN.ALL];
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
      <SEO title={heading} description={description} canonicalPath="/events" />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bebas text-msq-purple-rich">{heading}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter events by time"
          >
            {WHEN_OPTIONS.map(option => {
              const WhenIcon = option.icon;
              const isActive = when === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setWhen(option.value)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-sm ring-1 transition ${
                    isActive
                      ? 'bg-msq-purple-rich text-white ring-msq-purple-rich'
                      : 'bg-gray-50 text-gray-700 ring-gray-100 hover:bg-white hover:ring-gray-200'
                  }`}
                >
                  <WhenIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{EVENT_WHEN_LABELS[option.value]}</span>
                </button>
              );
            })}
          </div>

          <select
            value={type}
            onChange={e => setType(e.target.value)}
            aria-label="Filter events by type"
            className="cursor-pointer rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-100 outline-none transition hover:bg-white hover:ring-gray-200 focus:bg-white focus:ring-2 focus:ring-msq-purple-rich/30"
          >
            {TYPE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
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
                className="cursor-pointer text-sm font-medium underline hover:opacity-80 shrink-0"
              >
                Retry
              </button>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center border border-gray-200 rounded-lg bg-white">
            <div className="text-lg font-medium text-gray-900">
              {isFiltered ? 'No events found' : emptyCopy.title}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {isFiltered ? 'Try adjusting your filters.' : emptyCopy.body}
            </p>
          </div>
        ) : (
          <>
            {isFiltered && (
              <div className="mb-4 text-center">
                <p className="text-gray-600">
                  {events.length} result{events.length !== 1 ? 's' : ''} on this page
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
