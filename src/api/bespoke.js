import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Submit a bespoke request as multipart/form-data.
 * @param {Object} data - Form payload
 * @param {string} data.fullName - Full name (required)
 * @param {string} data.email - Email (required)
 * @param {string} [data.phone] - Phone (optional)
 * @param {string} [data.garmentType] - pants | skirts | dresses | dungarees | other
 * @param {string} [data.garmentTypeOther] - Custom garment type when garmentType is 'other'
 * @param {Object|string} [data.measurements] - When known category: object. When 'other': plain string.
 * @param {string} [data.styleNotes] - Style notes
 * @param {string} data.description - Required description
 * @param {File[]} [data.referencePhotos] - Reference image files
 * @returns {Promise<{ success: true, message: string }>}
 * @throws {Error} With server message on 4xx/5xx or 429
 */
export const submitBespokeRequest = async data => {
  const formData = new FormData();
  formData.append('fullName', data.fullName ?? '');
  formData.append('email', data.email ?? '');
  if (data.phone) formData.append('phone', data.phone);
  if (data.garmentType) formData.append('garmentType', data.garmentType);
  if (data.garmentType === 'other' && data.garmentTypeOther) {
    formData.append('garmentTypeOther', data.garmentTypeOther);
  }
  if (data.measurements !== undefined && data.measurements !== '') {
    const measurementsValue =
      typeof data.measurements === 'string' ? data.measurements : JSON.stringify(data.measurements);
    formData.append('measurements', measurementsValue);
  }
  if (data.styleNotes) formData.append('styleNotes', data.styleNotes);
  formData.append('description', data.description ?? '');
  if (data.referencePhotos?.length) {
    data.referencePhotos.forEach(file => formData.append('referencePhotos', file));
  }

  try {
    const response = await axios.post(`${API_URL}/bespoke`, formData, {
      withCredentials: true,
      // Do not set Content-Type; axios sets multipart/form-data with boundary for FormData
    });

    const resData = response.data;
    if (response.status === 201 && resData?.success) {
      return { success: true, message: resData.message ?? 'Bespoke form submitted successfully.' };
    }
    throw new Error(resData?.message ?? 'Something went wrong. Please try again.');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data?.message ??
        (error.response.status === 429
          ? 'Too many submissions. Please try again later.'
          : 'Something went wrong. Please try again.');
      throw new Error(message);
    }
    throw error;
  }
};
