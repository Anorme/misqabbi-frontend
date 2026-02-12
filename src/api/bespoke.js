/**
 * Bespoke request API.
 * Currently mocked; replace with real POST (multipart/form-data) when backend is ready.
 * @param {Object} data - Form payload
 * @param {string} [data.fullName] - Guest full name
 * @param {string} [data.email] - Guest email
 * @param {string} [data.phone] - Guest phone (optional)
 * @param {string} [data.garmentType] - pants | skirts | dresses | dungarees | other
 * @param {string} [data.garmentTypeOther] - Custom garment type when garmentType is 'other'
 * @param {Object|string} [data.measurements] - When known category: object (e.g. { waist, hip, length }). When 'other': free-form string.
 * @param {string} [data.styleNotes] - Style notes
 * @param {string} data.description - Required description
 * @param {File[]} [data.referencePhotos] - Reference image files
 */
export const submitBespokeRequest = async data => {
  // Mock: log payload for future backend integration
  const payload = {
    ...data,
    referencePhotos: data.referencePhotos?.length ?? 0,
  };
  console.log('[bespoke] Mock submit payload:', payload);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return { success: true, message: 'Request received. We will be in touch.' };
};
