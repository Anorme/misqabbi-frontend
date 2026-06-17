import axios from 'axios';
import { decodeHtmlEntities } from '../utils/decodeHtmlEntities';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const BASE = `${API_URL}/admin/events`;

const withCredentials = { withCredentials: true };

const buildQueryString = params => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) qs.set(k, String(v));
  });
  return qs.toString();
};

const appendNonEmptyString = (formData, key, value) => {
  if (typeof value !== 'string') return;
  const trimmed = decodeHtmlEntities(value).trim();
  if (trimmed) formData.append(key, trimmed);
};

/**
 * Build FormData for event create/update with optional banner file.
 * @param {Object} data - Event fields
 * @param {File} [bannerFile] - Banner image file
 * @returns {FormData}
 */
export const buildEventFormData = (data, bannerFile) => {
  const formData = new FormData();
  if (data.name != null) formData.append('name', decodeHtmlEntities(data.name));
  if (data.description != null) formData.append('description', data.description);
  if (data.eventDate != null) formData.append('eventDate', decodeHtmlEntities(data.eventDate));
  if (data.type != null) formData.append('type', decodeHtmlEntities(data.type));
  const maxAttendees = Number(data.maxAttendees);
  if (Number.isFinite(maxAttendees) && maxAttendees > 0) {
    formData.append('maxAttendees', String(Math.trunc(maxAttendees)));
  }
  appendNonEmptyString(formData, 'venue[name]', data.venue?.name);
  appendNonEmptyString(formData, 'venue[address]', data.venue?.address);
  appendNonEmptyString(formData, 'venue[url]', data.venue?.url);
  if (bannerFile instanceof File) formData.append('banner', bannerFile);
  return formData;
};

/**
 * POST /admin/events — create draft event (multipart or JSON)
 * @param {Object} data - Event fields
 * @param {File} [bannerFile]
 * @returns {Promise<{ success, data: event }>}
 */
export const createAdminEvent = async (data, bannerFile) => {
  if (bannerFile) {
    const formData = buildEventFormData(data, bannerFile);
    const res = await axios.post(BASE, formData, withCredentials);
    if (!res.data?.success) throw new Error(res.data?.error || 'Failed to create event');
    return res.data;
  }
  const res = await axios.post(BASE, data, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to create event');
  return res.data;
};

/**
 * GET /admin/events?page&limit&status&type&q
 * @param {Object} params
 * @returns {Promise<{ success, data: event[], pagination }>}
 */
export const getAdminEvents = async (params = {}) => {
  const qs = buildQueryString(params);
  const url = qs ? `${BASE}?${qs}` : BASE;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load events');
  return res.data;
};

/**
 * GET /admin/events/:id
 * @param {string} id
 * @returns {Promise<{ success, data: event }>}
 */
export const getAdminEventById = async id => {
  const res = await axios.get(`${BASE}/${id}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load event');
  return res.data;
};

/**
 * PATCH /admin/events/:id — update event (multipart or JSON)
 * @param {string} id
 * @param {Object} data
 * @param {File} [bannerFile]
 * @returns {Promise<{ success, data: event }>}
 */
export const updateAdminEvent = async (id, data, bannerFile) => {
  if (bannerFile) {
    const formData = buildEventFormData(data, bannerFile);
    const res = await axios.patch(`${BASE}/${id}`, formData, withCredentials);
    if (!res.data?.success) throw new Error(res.data?.error || 'Failed to update event');
    return res.data;
  }
  const res = await axios.patch(`${BASE}/${id}`, data, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to update event');
  return res.data;
};

/**
 * PATCH /admin/events/:id/status
 * @param {string} id
 * @param {string} status - draft|published|cancelled
 * @returns {Promise<{ success, data: event }>}
 */
export const updateAdminEventStatus = async (id, status) => {
  const res = await axios.patch(`${BASE}/${id}/status`, { status }, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to update event status');
  return res.data;
};

/**
 * PUT /admin/events/:id/registration-form
 * @param {string} id
 * @param {Object} formSchema - { builtinFields, customQuestions }
 * @returns {Promise<{ success, data: { event, registrationForm } }>}
 */
export const upsertAdminRegistrationForm = async (id, formSchema) => {
  const res = await axios.put(`${BASE}/${id}/registration-form`, formSchema, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to save registration form');
  return res.data;
};

/**
 * GET /admin/events/:id/registration-form
 * @param {string} id
 * @returns {Promise<{ success, data: formSchema }>}
 */
export const getAdminRegistrationForm = async id => {
  const res = await axios.get(`${BASE}/${id}/registration-form`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load registration form');
  return res.data;
};

/**
 * PUT /admin/events/:id/volunteer-form
 * @param {string} id
 * @param {Object} formSchema
 * @returns {Promise<{ success, data: { event, volunteerForm } }>}
 */
export const upsertAdminVolunteerForm = async (id, formSchema) => {
  const res = await axios.put(`${BASE}/${id}/volunteer-form`, formSchema, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to save volunteer form');
  return res.data;
};

/**
 * GET /admin/events/:id/volunteer-form
 * @param {string} id
 * @returns {Promise<{ success, data: formSchema }>}
 */
export const getAdminVolunteerForm = async id => {
  const res = await axios.get(`${BASE}/${id}/volunteer-form`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load volunteer form');
  return res.data;
};

/**
 * POST /admin/events/:id/ticket-types
 * @param {string} id
 * @param {Object} body - { name, pricePesewas, maxQuantity, expiresAt?, isActive? }
 * @returns {Promise<{ success, data: event }>}
 */
export const createAdminTicketType = async (id, body) => {
  const res = await axios.post(`${BASE}/${id}/ticket-types`, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to create ticket type');
  return res.data;
};

/**
 * PATCH /admin/events/:id/ticket-types/:ticketTypeId
 * @param {string} id
 * @param {string} ticketTypeId
 * @param {Object} body
 * @returns {Promise<{ success, data: event }>}
 */
export const updateAdminTicketType = async (id, ticketTypeId, body) => {
  const res = await axios.patch(
    `${BASE}/${id}/ticket-types/${ticketTypeId}`,
    body,
    withCredentials
  );
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to update ticket type');
  return res.data;
};

/**
 * DELETE /admin/events/:id/ticket-types/:ticketTypeId
 * @param {string} id
 * @param {string} ticketTypeId
 * @returns {Promise<{ success, data: event }>}
 */
export const deleteAdminTicketType = async (id, ticketTypeId) => {
  const res = await axios.delete(`${BASE}/${id}/ticket-types/${ticketTypeId}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to delete ticket type');
  return res.data;
};

/**
 * GET /admin/events/:id/attendees?page&limit&status&ticketTypeId
 * @param {string} id
 * @param {Object} params
 * @returns {Promise<{ success, data: registration[], pagination }>}
 */
export const getAdminEventAttendees = async (id, params = {}) => {
  const qs = buildQueryString(params);
  const url = qs ? `${BASE}/${id}/attendees?${qs}` : `${BASE}/${id}/attendees`;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load attendees');
  return res.data;
};

/**
 * GET /admin/events/:id/attendees/:registrationId
 * @param {string} id
 * @param {string} registrationId
 * @returns {Promise<{ success, data: registration }>}
 */
export const getAdminEventAttendeeById = async (id, registrationId) => {
  const res = await axios.get(`${BASE}/${id}/attendees/${registrationId}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load attendee');
  return res.data;
};

/**
 * GET /admin/events/:id/volunteer-applications?page&limit&status
 * @param {string} id
 * @param {Object} params
 * @returns {Promise<{ success, data: application[], pagination }>}
 */
export const getAdminVolunteerApplications = async (id, params = {}) => {
  const qs = buildQueryString(params);
  const url = qs
    ? `${BASE}/${id}/volunteer-applications?${qs}`
    : `${BASE}/${id}/volunteer-applications`;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success)
    throw new Error(res.data?.error || 'Failed to load volunteer applications');
  return res.data;
};

/**
 * GET /admin/events/:id/volunteer-applications/:applicationId
 * @param {string} id
 * @param {string} applicationId
 * @returns {Promise<{ success, data: application }>}
 */
export const getAdminVolunteerApplicationById = async (id, applicationId) => {
  const res = await axios.get(
    `${BASE}/${id}/volunteer-applications/${applicationId}`,
    withCredentials
  );
  if (!res.data?.success)
    throw new Error(res.data?.error || 'Failed to load volunteer application');
  return res.data;
};

/**
 * PATCH /admin/events/:id/volunteer-applications/:applicationId
 * @param {string} id
 * @param {string} applicationId
 * @param {Object} body - { status }
 * @returns {Promise<{ success, data: application }>}
 */
export const updateAdminVolunteerApplication = async (id, applicationId, body) => {
  const res = await axios.patch(
    `${BASE}/${id}/volunteer-applications/${applicationId}`,
    body,
    withCredentials
  );
  if (!res.data?.success)
    throw new Error(res.data?.error || 'Failed to update volunteer application');
  return res.data;
};
