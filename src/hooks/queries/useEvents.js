import { useQuery } from '@tanstack/react-query';
import { getPublishedEvents, getEventBySlug } from '../../api/events';

/**
 * Query hook for published events listing
 * @param {Object} params - page, limit, type, q
 */
export const useEvents = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['events', 'list', params],
    queryFn: () => getPublishedEvents(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for a single published event by slug
 * @param {string} slug
 */
export const useEvent = (slug, options = {}) => {
  return useQuery({
    queryKey: ['events', 'detail', slug],
    queryFn: () => getEventBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options,
  });
};
