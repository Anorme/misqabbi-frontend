import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const BASE = `${API_URL}/events`;

const withCredentials = { withCredentials: true };

const buildQueryString = params => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) qs.set(k, String(v));
  });
  return qs.toString();
};

/**
 * GET /events?page&limit&type&q
 * @param {Object} params - page, limit, type (free|paid), q
 * @returns {Promise<{ success, data: event[], pagination }>}
 */
export const getPublishedEvents = async (params = {}) => {
  const qs = buildQueryString(params);
  const url = qs ? `${BASE}?${qs}` : BASE;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load events');
  return res.data;
};

/**
 * GET /events/:slug
 * @param {string} slug
 * @returns {Promise<{ success, data: event }>}
 */
export const getEventBySlug = async slug => {
  const res = await axios.get(`${BASE}/${slug}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load event');
  return res.data;
};

/**
 * POST /events/:slug/register — free event RSVP (requires auth or guest session)
 * @param {string} slug
 * @param {Object} body - { guestInfo?, formResponses? }
 * @returns {Promise<{ success, data: registration }>}
 */
export const registerForEvent = async (slug, body) => {
  const res = await axios.post(`${BASE}/${slug}/register`, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to register for event');
  return res.data;
};

/**
 * POST /events/:slug/checkout — paid ticket checkout (requires auth or guest session)
 * @param {string} slug
 * @param {Object} body - { ticketTypeId, quantity, guestInfo?, formResponses? }
 * @returns {Promise<{ success, data: { authorizationUrl, reference, amount, eventRegistration, transaction } }>}
 */
export const checkoutEvent = async (slug, body) => {
  const res = await axios.post(`${BASE}/${slug}/checkout`, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to checkout event');
  return res.data;
};

/**
 * POST /events/:slug/volunteer-applications (requires auth or guest session)
 * @param {string} slug
 * @param {Object} body - { applicantInfo, formResponses? }
 * @returns {Promise<{ success, data: volunteerApplication }>}
 */
export const submitVolunteerApplication = async (slug, body) => {
  const res = await axios.post(`${BASE}/${slug}/volunteer-applications`, body, withCredentials);
  if (!res.data?.success)
    throw new Error(res.data?.error || 'Failed to submit volunteer application');
  return res.data;
};
