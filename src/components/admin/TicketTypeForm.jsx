import { useState } from 'react';
import FormField from './FormField';
import { ghsToPesewas, pesewasToGhs } from '../../utils/events';

const emptyForm = () => ({
  name: '',
  priceGhs: '',
  maxQuantity: '',
  expiresAt: '',
  isActive: true,
});

const TicketTypeForm = ({ initialData = null, onSubmit, onCancel, isLoading, error }) => {
  const [formData, setFormData] = useState(() => {
    if (!initialData) return emptyForm();
    return {
      name: initialData.name ?? '',
      priceGhs: pesewasToGhs(initialData.pricePesewas).toFixed(2),
      maxQuantity: initialData.maxQuantity ?? '',
      expiresAt: initialData.expiresAt
        ? new Date(initialData.expiresAt).toISOString().slice(0, 16)
        : '',
      isActive: initialData.isActive !== false,
    };
  });

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      name: formData.name.trim(),
      pricePesewas: ghsToPesewas(formData.priceGhs),
      maxQuantity: Number(formData.maxQuantity),
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
      isActive: formData.isActive,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
    >
      <h3 className="text-sm font-semibold text-gray-900">
        {initialData ? 'Edit ticket type' : 'New ticket type'}
      </h3>

      <FormField
        label="Name"
        value={formData.name}
        onChange={value => update('name', value)}
        placeholder="General admission"
        required
      />

      <FormField
        label="Price (GHS)"
        type="number"
        value={formData.priceGhs}
        onChange={value => update('priceGhs', value)}
        placeholder="50.00"
        required
      />

      <FormField
        label="Max quantity"
        type="number"
        value={formData.maxQuantity}
        onChange={value => update('maxQuantity', value)}
        placeholder="100"
        required
      />

      <FormField
        label="Expires at"
        type="datetime-local"
        value={formData.expiresAt}
        onChange={value => update('expiresAt', value)}
      />

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={e => update('isActive', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Active (available for purchase)
      </label>

      {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple-deep disabled:opacity-50"
        >
          {isLoading ? 'Saving…' : initialData ? 'Update ticket' : 'Add ticket'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TicketTypeForm;
