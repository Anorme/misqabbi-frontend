import { memo } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Users } from 'lucide-react';

import { EVENT_TYPE_LABELS } from '../../constants/events';
import { formatEventDate, formatEventVenue } from '../../utils/events';
import { getEventTypeColor } from '../../utils/events/statusBadges';

const getSpotsLabel = spotsRemaining => {
  if (spotsRemaining == null) return null;
  if (spotsRemaining <= 0) return 'Full';
  return `${spotsRemaining} spot${spotsRemaining !== 1 ? 's' : ''} remaining`;
};

const EventCard = ({ event }) => {
  const bannerUrl = event.banner?.url;
  const venueLabel = formatEventVenue(event.venue);
  const spotsLabel = getSpotsLabel(event.spotsRemaining);

  return (
    <div className="bg-white border-none rounded-none w-full mx-auto">
      <Link to={`/events/${event.slug}`} className="block group">
        <div className="aspect-[3/4] w-full relative bg-gray-100 overflow-hidden">
          {bannerUrl ? (
            <img
              src={bannerUrl}
              alt={event.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-msq-gold-light/10">
              <Calendar className="w-12 h-12 text-msq-purple-deep/30" aria-hidden="true" />
            </div>
          )}
          <span
            className={`absolute top-3 left-3 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}
          >
            {EVENT_TYPE_LABELS[event.type] || event.type}
          </span>
        </div>
      </Link>
      <div className="px-4 py-2">
        <Link to={`/events/${event.slug}`}>
          <h3 className="text-xs sm:text-xs md:text-sm lg:text-lg font-medium text-msq-purple uppercase text-left tracking-wide hover:text-msq-purple-rich transition-colors">
            {event.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs sm:text-sm text-gray-600 flex items-start gap-1">
          <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{formatEventDate(event.eventDate)}</span>
        </p>
        {venueLabel && (
          <p className="mt-0.5 text-xs sm:text-sm text-gray-600 flex items-start gap-1">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span className="line-clamp-2">{venueLabel}</span>
          </p>
        )}
        {spotsLabel && (
          <p className="mt-1 text-xs sm:text-sm font-medium text-msq-purple-deep flex items-center gap-1">
            <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{spotsLabel}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(EventCard);
