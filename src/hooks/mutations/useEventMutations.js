import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerForEvent, checkoutEvent, submitVolunteerApplication } from '../../api/events';
import {
  createAdminEvent,
  updateAdminEvent,
  updateAdminEventStatus,
  upsertAdminRegistrationForm,
  upsertAdminVolunteerForm,
  createAdminTicketType,
  updateAdminTicketType,
  deleteAdminTicketType,
  updateAdminVolunteerApplication,
} from '../../api/adminEvents';

const invalidateAdminEvents = (queryClient, eventId) => {
  queryClient.invalidateQueries({ queryKey: ['admin', 'events', 'list'] });
  if (eventId) {
    queryClient.invalidateQueries({ queryKey: ['admin', 'events', 'detail', eventId] });
  }
};

const invalidatePublicEvents = (queryClient, slug) => {
  queryClient.invalidateQueries({ queryKey: ['events', 'list'] });
  if (slug) {
    queryClient.invalidateQueries({ queryKey: ['events', 'detail', slug] });
  }
};

/** Admin: create event */
export const useCreateAdminEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, bannerFile }) => createAdminEvent(data, bannerFile),
    onSuccess: () => invalidateAdminEvents(queryClient),
  });
};

/** Admin: update event */
export const useUpdateAdminEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, bannerFile }) => updateAdminEvent(id, data, bannerFile),
    onSuccess: (_, { id }) => invalidateAdminEvents(queryClient, id),
  });
};

/** Admin: transition event status */
export const useUpdateAdminEventStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateAdminEventStatus(id, status),
    onSuccess: (_, { id }) => {
      invalidateAdminEvents(queryClient, id);
      queryClient.invalidateQueries({ queryKey: ['events', 'list'] });
    },
  });
};

/** Admin: upsert registration form */
export const useUpsertAdminRegistrationForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formSchema }) => upsertAdminRegistrationForm(id, formSchema),
    onSuccess: (_, { id }) => {
      invalidateAdminEvents(queryClient, id);
      queryClient.invalidateQueries({ queryKey: ['admin', 'events', 'registration-form', id] });
    },
  });
};

/** Admin: upsert volunteer form */
export const useUpsertAdminVolunteerForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formSchema }) => upsertAdminVolunteerForm(id, formSchema),
    onSuccess: (_, { id }) => {
      invalidateAdminEvents(queryClient, id);
      queryClient.invalidateQueries({ queryKey: ['admin', 'events', 'volunteer-form', id] });
    },
  });
};

/** Admin: create ticket type */
export const useCreateAdminTicketType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, body }) => createAdminTicketType(eventId, body),
    onSuccess: (_, { eventId }) => invalidateAdminEvents(queryClient, eventId),
  });
};

/** Admin: update ticket type */
export const useUpdateAdminTicketType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, ticketTypeId, body }) =>
      updateAdminTicketType(eventId, ticketTypeId, body),
    onSuccess: (_, { eventId }) => invalidateAdminEvents(queryClient, eventId),
  });
};

/** Admin: delete ticket type */
export const useDeleteAdminTicketType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, ticketTypeId }) => deleteAdminTicketType(eventId, ticketTypeId),
    onSuccess: (_, { eventId }) => invalidateAdminEvents(queryClient, eventId),
  });
};

/** Admin: update volunteer application status */
export const useUpdateAdminVolunteerApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, applicationId, status }) =>
      updateAdminVolunteerApplication(eventId, applicationId, { status }),
    onSuccess: (_, { eventId, applicationId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events', 'volunteers', eventId] });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'events', 'volunteers', eventId, 'detail', applicationId],
      });
    },
  });
};

/** Public: free event registration */
export const useRegisterForEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }) => registerForEvent(slug, body),
    onSuccess: (_, { slug }) => invalidatePublicEvents(queryClient, slug),
  });
};

/** Public: paid event checkout */
export const useCheckoutEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }) => checkoutEvent(slug, body),
    onSuccess: (_, { slug }) => invalidatePublicEvents(queryClient, slug),
  });
};

/** Public: volunteer application */
export const useSubmitVolunteerApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }) => submitVolunteerApplication(slug, body),
    onSuccess: (_, { slug }) => invalidatePublicEvents(queryClient, slug),
  });
};
