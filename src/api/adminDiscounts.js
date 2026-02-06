import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const BASE = `${API_URL}/admin/discounts`;

const withCredentials = { withCredentials: true };

/**
 * GET /admin/discounts/stats
 * @returns {Promise<{ success: boolean, data: { total, active, expired, totalUsage } }>}
 */
export const getAdminDiscountStats = async () => {
  const res = await axios.get(`${BASE}/stats`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load discount stats');
  return res.data;
};

/**
 * GET /admin/discounts?page&limit&isActive&scope&usageType&expired&q
 * @param {Object} params - page, limit, isActive, scope, usageType, expired, q
 * @returns {Promise<{ success, data: discount[], pagination }>}
 */
export const getAdminDiscounts = async (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) qs.set(k, String(v));
  });
  const url = qs.toString() ? `${BASE}?${qs}` : BASE;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load discounts');
  return res.data;
};

/**
 * GET /admin/discounts/:id
 * @param {string} id
 * @returns {Promise<{ success, data: discount & usageStats }>}
 */
export const getAdminDiscountById = async id => {
  const res = await axios.get(`${BASE}/${id}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load discount');
  return res.data;
};

/**
 * POST /admin/discounts
 * @param {Object} body - discountType, discountValue, expiryDate, code?, description?, ...
 * @returns {Promise<{ success, data }>}
 */
export const createAdminDiscount = async body => {
  const res = await axios.post(BASE, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to create discount');
  return res.data;
};

/**
 * PUT /admin/discounts/:id
 * @param {string} id
 * @param {Object} body - subset of discount fields (code cannot be changed)
 * @returns {Promise<{ success, data }>}
 */
export const updateAdminDiscount = async (id, body) => {
  const res = await axios.put(`${BASE}/${id}`, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to update discount');
  return res.data;
};

/**
 * DELETE /admin/discounts/:id (soft deactivate)
 * @param {string} id
 * @returns {Promise<{ success, message, data }>}
 */
export const deleteAdminDiscount = async id => {
  const res = await axios.delete(`${BASE}/${id}`, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to deactivate discount');
  return res.data;
};

/**
 * POST /admin/discounts/generate-code
 * @param {Object} [body] - { prefix?, segmentLength?, segmentCount? }
 * @returns {Promise<{ success, data: { code } }>}
 */
export const generateAdminDiscountCode = async (body = {}) => {
  const res = await axios.post(`${BASE}/generate-code`, body, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to generate code');
  return res.data;
};

/**
 * GET /admin/discounts/:id/usage?page&limit
 * @param {string} id
 * @param {Object} params - page, limit
 * @returns {Promise<{ success, data: usage[], pagination }>}
 */
export const getAdminDiscountUsage = async (id, params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') qs.set(k, String(v));
  });
  const url = qs.toString() ? `${BASE}/${id}/usage?${qs}` : `${BASE}/${id}/usage`;
  const res = await axios.get(url, withCredentials);
  if (!res.data?.success) throw new Error(res.data?.error || 'Failed to load usage');
  return res.data;
};
