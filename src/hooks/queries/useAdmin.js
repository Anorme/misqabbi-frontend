import { useQuery } from '@tanstack/react-query';
import { fetchAdminDashboard } from '../../api/admin';
import { fetchAdminProducts } from '../../api/products';
import { fetchAdminOrders, fetchAdminOrderById } from '../../api/orders';
import { fetchAdminUsers } from '../../api/users';
import {
  getAdminDiscounts,
  getAdminDiscountStats,
  getAdminDiscountById,
  getAdminDiscountUsage,
} from '../../api/adminDiscounts';
import {
  getAdminEvents,
  getAdminEventById,
  getAdminRegistrationForm,
  getAdminVolunteerForm,
  getAdminEventAttendees,
  getAdminEventAttendeeById,
  getAdminVolunteerApplications,
  getAdminVolunteerApplicationById,
} from '../../api/adminEvents';

/**
 * Query hook for fetching admin dashboard data
 */
export const useAdminDashboard = (options = {}) => {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => fetchAdminDashboard(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin products with pagination
 */
export const useAdminProducts = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'products', { page, limit }],
    queryFn: () => fetchAdminProducts({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin orders with pagination
 */
export const useAdminOrders = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'orders', { page, limit }],
    queryFn: () => fetchAdminOrders({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin users with pagination
 */
export const useAdminUsers = (params = {}, options = {}) => {
  const { page = 1, limit = 12 } = params;

  return useQuery({
    queryKey: ['admin', 'users', { page, limit }],
    queryFn: () => fetchAdminUsers({ page, limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching a single admin order by ID
 */
export const useAdminOrder = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'orders', 'detail', id],
    queryFn: () => fetchAdminOrderById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Query hook for fetching admin discounts list with filters and pagination
 */
export const useAdminDiscounts = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'discounts', 'list', params],
    queryFn: () => getAdminDiscounts(params),
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for admin discount stats (total, active, expired, totalUsage)
 */
export const useAdminDiscountStats = (options = {}) => {
  return useQuery({
    queryKey: ['admin', 'discounts', 'stats'],
    queryFn: () => getAdminDiscountStats(),
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for a single admin discount by ID (detail + usageStats)
 */
export const useAdminDiscount = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'discounts', 'detail', id],
    queryFn: () => getAdminDiscountById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for discount usage history (paginated)
 */
export const useAdminDiscountUsage = (id, params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'discounts', 'usage', id, params],
    queryFn: () => getAdminDiscountUsage(id, params),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for admin events list with filters and pagination
 */
export const useAdminEvents = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'list', params],
    queryFn: () => getAdminEvents(params),
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for a single admin event by ID
 */
export const useAdminEvent = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'detail', id],
    queryFn: () => getAdminEventById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for event registration form schema
 */
export const useAdminEventRegistrationForm = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'registration-form', id],
    queryFn: () => getAdminRegistrationForm(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Query hook for event volunteer form schema
 */
export const useAdminEventVolunteerForm = (id, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'volunteer-form', id],
    queryFn: () => getAdminVolunteerForm(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Query hook for event attendees (registrations)
 */
export const useAdminEventAttendees = (id, params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'attendees', id, params],
    queryFn: () => getAdminEventAttendees(id, params),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for a single event attendee registration
 */
export const useAdminEventAttendee = (eventId, registrationId, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'attendees', eventId, 'detail', registrationId],
    queryFn: () => getAdminEventAttendeeById(eventId, registrationId),
    enabled: !!eventId && !!registrationId,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for volunteer applications on an event
 */
export const useAdminVolunteerApplications = (id, params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'volunteers', id, params],
    queryFn: () => getAdminVolunteerApplications(id, params),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Query hook for a single volunteer application
 */
export const useAdminVolunteerApplication = (eventId, applicationId, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'events', 'volunteers', eventId, 'detail', applicationId],
    queryFn: () => getAdminVolunteerApplicationById(eventId, applicationId),
    enabled: !!eventId && !!applicationId,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};
