import { useState } from 'react';
import FormField from './FormField';
import { EVENT_TYPE, EVENT_TYPES, EVENT_TYPE_LABELS } from '../../constants/events';
import { decodeHtmlEntities } from '../../utils/decodeHtmlEntities';

const TYPE_OPTIONS = EVENT_TYPES.map(value => ({
  value,
  label: EVENT_TYPE_LABELS[value],
}));

const emptyForm = () => ({
  name: '',
  description: '',
  eventDate: '',
  type: EVENT_TYPE.FREE,
  maxAttendees: '',
  venueName: '',
  venueAddress: '',
  venueUrl: '',
  bannerFile: null,
  removeBanner: false,
});

const EventForm = ({ initialData = null, onSubmit, isLoading, error: submitError }) => {
  const [formData, setFormData] = useState(() => {
    if (!initialData) return emptyForm();
    return {
      name: initialData.name ?? '',
      description: initialData.description ?? '',
      eventDate: initialData.eventDate
        ? new Date(initialData.eventDate).toISOString().slice(0, 16)
        : '',
      type: initialData.type ?? EVENT_TYPE.FREE,
      maxAttendees: initialData.maxAttendees ?? '',
      venueName: initialData.venue?.name ?? '',
      venueAddress: initialData.venue?.address ?? '',
      venueUrl: initialData.venue?.url ?? '',
      bannerFile: null,
      removeBanner: false,
    };
  });
  const [validationErrors, setValidationErrors] = useState({});

  const update = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (key === 'maxAttendees') {
      setValidationErrors(prev => {
        if (!prev.maxAttendees) return prev;
        const next = { ...prev };
        delete next.maxAttendees;
        return next;
      });
    }
  };

  const buildPayload = () => {
    const maxAttendees = Number(formData.maxAttendees);
    if (!Number.isInteger(maxAttendees) || maxAttendees <= 0) {
      setValidationErrors({ maxAttendees: 'Max attendees must be a positive whole number.' });
      return null;
    }

    const venue = {
      name: decodeHtmlEntities(formData.venueName).trim(),
      address: decodeHtmlEntities(formData.venueAddress).trim(),
      url: decodeHtmlEntities(formData.venueUrl).trim(),
    };

    const payload = {
      name: decodeHtmlEntities(formData.name).trim(),
      description: formData.description,
      eventDate: new Date(decodeHtmlEntities(formData.eventDate)).toISOString(),
      type: decodeHtmlEntities(formData.type),
      maxAttendees,
    };
    if (venue.name || venue.address || venue.url) payload.venue = venue;
    if (formData.removeBanner) payload.banner = null;
    setValidationErrors({});
    return payload;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = buildPayload();
    if (!payload) return;
    onSubmit({
      data: payload,
      bannerFile: formData.bannerFile?.[0] || null,
    });
  };

  const existingBanner = initialData?.banner?.url;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Event Name"
        value={formData.name}
        onChange={value => update('name', value)}
        placeholder="Summer showcase"
        required
        sanitizeType="name"
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={value => update('description', value)}
        placeholder="Describe the event"
        required
        sanitizeType="description"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Event Date & Time"
          type="datetime-local"
          value={formData.eventDate}
          onChange={value => update('eventDate', value)}
          required
        />

        <FormField
          label="Event Type"
          type="select"
          value={formData.type}
          onChange={value => update('type', value)}
          options={TYPE_OPTIONS}
          required
        />
      </div>

      <FormField
        label="Max Attendees"
        type="number"
        value={formData.maxAttendees}
        onChange={value => update('maxAttendees', value)}
        placeholder="100"
        error={validationErrors.maxAttendees}
        required
      />

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Venue (optional)</h3>
        <FormField
          label="Venue Name"
          value={formData.venueName}
          onChange={value => update('venueName', value)}
          placeholder="Misqabbi Studio"
        />
        <FormField
          label="Venue Address"
          value={formData.venueAddress}
          onChange={value => update('venueAddress', value)}
          placeholder="123 Fashion Street, Accra"
        />
        <FormField
          label="Venue URL"
          type="url"
          value={formData.venueUrl}
          onChange={value => update('venueUrl', value)}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Banner (optional)</h3>
        {existingBanner && !formData.removeBanner && (
          <div className="mb-3">
            <img
              src={existingBanner}
              alt="Current event banner"
              className="h-32 w-full max-w-md object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              className="mt-2 text-sm text-red-600 hover:text-red-800"
              onClick={() => update('removeBanner', true)}
            >
              Remove banner
            </button>
          </div>
        )}
        {formData.removeBanner && (
          <p className="mb-2 text-sm text-amber-700">Banner will be removed on save.</p>
        )}
        <FormField
          label="Upload Banner"
          type="file"
          value={formData.bannerFile}
          onChange={files => {
            update('bannerFile', files);
            if (files?.length) update('removeBanner', false);
          }}
        />
      </div>

      {submitError && (
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{submitError}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple-deep disabled:opacity-50"
      >
        {isLoading ? 'Saving…' : initialData ? 'Update event' : 'Create event'}
      </button>
    </form>
  );
};

export default EventForm;
