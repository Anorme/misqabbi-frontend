import { useState } from 'react';
import FormField from './FormField';
import { CATEGORIES } from '../../constants/categories';

const DISCOUNT_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed amount' },
];
const SCOPE_OPTIONS = [
  { value: 'order', label: 'Order' },
  { value: 'products', label: 'Products' },
];
const USAGE_TYPE_OPTIONS = [
  { value: 'single_use', label: 'Single use' },
  { value: 'multi_use', label: 'Multi use' },
  { value: 'per_user', label: 'Per user' },
];

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c.value).map(c => ({
  value: c.value,
  label: c.label,
}));

const emptyForm = () => ({
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: '',
  maxDiscountAmount: '',
  expiryDate: '',
  scope: 'order',
  applicableProducts: [],
  applicableCategories: [],
  usageType: 'multi_use',
  maxGlobalUses: '',
  maxUsesPerUser: '',
  minOrderValue: '',
  minItemCount: '',
  firstOrderOnly: false,
  isActive: true,
});

const DiscountForm = ({
  initialData = null,
  onSubmit,
  isLoading,
  error: submitError,
  onGenerateCode,
  productOptions = [],
  codeReadOnly = false,
}) => {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        code: initialData.code ?? '',
        description: initialData.description ?? '',
        discountType: initialData.discountType ?? 'percentage',
        discountValue: initialData.discountValue ?? '',
        maxDiscountAmount: initialData.maxDiscountAmount ?? '',
        expiryDate: initialData.expiryDate
          ? new Date(initialData.expiryDate).toISOString().slice(0, 16)
          : '',
        scope: initialData.scope ?? 'order',
        applicableProducts: Array.isArray(initialData.applicableProducts)
          ? initialData.applicableProducts.map(p => (typeof p === 'string' ? p : p._id || p))
          : [],
        applicableCategories: Array.isArray(initialData.applicableCategories)
          ? [...initialData.applicableCategories]
          : [],
        usageType: initialData.usageType ?? 'multi_use',
        maxGlobalUses: initialData.maxGlobalUses ?? '',
        maxUsesPerUser: initialData.maxUsesPerUser ?? '',
        minOrderValue: initialData.minOrderValue ?? '',
        minItemCount: initialData.minItemCount ?? '',
        firstOrderOnly: !!initialData.firstOrderOnly,
        isActive: initialData.isActive !== false,
      };
    }
    return emptyForm();
  });

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const buildPayload = () => {
    const payload = {
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      expiryDate: new Date(formData.expiryDate).toISOString(),
      description: formData.description || undefined,
      scope: formData.scope,
      usageType: formData.usageType,
      firstOrderOnly: formData.firstOrderOnly,
      isActive: formData.isActive,
    };
    if (formData.code.trim()) payload.code = formData.code.trim();
    if (formData.maxDiscountAmount !== '')
      payload.maxDiscountAmount = Number(formData.maxDiscountAmount);
    if (formData.maxGlobalUses !== '') payload.maxGlobalUses = Number(formData.maxGlobalUses);
    if (formData.maxUsesPerUser !== '') payload.maxUsesPerUser = Number(formData.maxUsesPerUser);
    if (formData.minOrderValue !== '') payload.minOrderValue = Number(formData.minOrderValue);
    if (formData.minItemCount !== '') payload.minItemCount = Number(formData.minItemCount);
    if (formData.scope === 'products') {
      if (formData.applicableProducts.length)
        payload.applicableProducts = formData.applicableProducts;
      if (formData.applicableCategories.length)
        payload.applicableCategories = formData.applicableCategories;
    }
    return payload;
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(buildPayload());
  };

  const toggleProduct = id => {
    setFormData(prev => ({
      ...prev,
      applicableProducts: prev.applicableProducts.includes(id)
        ? prev.applicableProducts.filter(x => x !== id)
        : [...prev.applicableProducts, id],
    }));
  };

  const toggleCategory = value => {
    setFormData(prev => ({
      ...prev,
      applicableCategories: prev.applicableCategories.includes(value)
        ? prev.applicableCategories.filter(x => x !== value)
        : [...prev.applicableCategories, value],
    }));
  };

  const isProductsScope = formData.scope === 'products';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {submitError && (
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-lato">{submitError}</div>
      )}

      {!codeReadOnly && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <FormField
              label="Code (optional – leave blank to auto-generate)"
              value={formData.code}
              onChange={v => update('code', v)}
              placeholder="e.g. SAVE20"
            />
          </div>
          {onGenerateCode && (
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await onGenerateCode();
                  if (res?.data?.code) update('code', res.data.code);
                } catch {
                  // Error surfaced by caller or toast
                }
              }}
              className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Generate code
            </button>
          )}
        </div>
      )}
      {codeReadOnly && (
        <FormField label="Code" value={formData.code} onChange={() => {}} placeholder="—" />
      )}

      <FormField
        label="Description"
        value={formData.description}
        onChange={v => update('description', v)}
        placeholder="e.g. 20% off your order"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Discount type"
          type="select"
          value={formData.discountType}
          onChange={v => update('discountType', v)}
          options={DISCOUNT_TYPE_OPTIONS}
        />
        <FormField
          label="Discount value"
          type="number"
          value={formData.discountValue}
          onChange={v => update('discountValue', v)}
          placeholder={formData.discountType === 'percentage' ? '20' : '50'}
          required
        />
      </div>

      <FormField
        label="Max discount amount (optional, for percentage)"
        type="number"
        value={formData.maxDiscountAmount}
        onChange={v => update('maxDiscountAmount', v)}
        placeholder="e.g. 100"
      />

      <FormField
        label="Expiry date"
        type="datetime-local"
        value={formData.expiryDate}
        onChange={v => update('expiryDate', v)}
        required
      />

      <FormField
        label="Scope"
        type="select"
        value={formData.scope}
        onChange={v => update('scope', v)}
        options={SCOPE_OPTIONS}
      />

      {isProductsScope && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicable categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(opt => (
                <label key={opt.value} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.applicableCategories.includes(opt.value)}
                    onChange={() => toggleCategory(opt.value)}
                    className="rounded border-gray-300 text-msq-purple-rich focus:ring-msq-purple-rich"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicable products (optional)
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-1">
              {productOptions.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No products loaded. Save as order scope or add product IDs manually if needed.
                </p>
              ) : (
                productOptions.slice(0, 100).map(p => (
                  <label key={p._id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.applicableProducts.includes(p._id)}
                      onChange={() => toggleProduct(p._id)}
                      className="rounded border-gray-300 text-msq-purple-rich focus:ring-msq-purple-rich"
                    />
                    <span className="text-sm truncate">{p.name}</span>
                    <span className="text-xs text-gray-400">({p._id?.slice(-6)})</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </>
      )}

      <FormField
        label="Usage type"
        type="select"
        value={formData.usageType}
        onChange={v => update('usageType', v)}
        options={USAGE_TYPE_OPTIONS}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Max global uses (optional)"
          type="number"
          value={formData.maxGlobalUses}
          onChange={v => update('maxGlobalUses', v)}
          placeholder="e.g. 100"
        />
        <FormField
          label="Max uses per user (optional)"
          type="number"
          value={formData.maxUsesPerUser}
          onChange={v => update('maxUsesPerUser', v)}
          placeholder="e.g. 1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Min order value (optional)"
          type="number"
          value={formData.minOrderValue}
          onChange={v => update('minOrderValue', v)}
          placeholder="e.g. 100"
        />
        <FormField
          label="Min item count (optional)"
          type="number"
          value={formData.minItemCount}
          onChange={v => update('minItemCount', v)}
          placeholder="e.g. 2"
        />
      </div>

      <div className="flex gap-6">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.firstOrderOnly}
            onChange={e => update('firstOrderOnly', e.target.checked)}
            className="rounded border-gray-300 text-msq-purple-rich focus:ring-msq-purple-rich"
          />
          <span className="text-sm font-medium text-gray-700">First order only</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={e => update('isActive', e.target.checked)}
            className="rounded border-gray-300 text-msq-purple-rich focus:ring-msq-purple-rich"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-msq-purple-rich text-white text-sm font-medium rounded-md hover:bg-msq-purple-deep disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update discount' : 'Create discount'}
        </button>
      </div>
    </form>
  );
};

export default DiscountForm;
