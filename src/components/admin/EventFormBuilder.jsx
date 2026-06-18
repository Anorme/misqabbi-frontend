import { useEffect, useState } from 'react';
import BuiltinFieldsEditor from './BuiltinFieldsEditor';
import CustomQuestionsEditor from './CustomQuestionsEditor';
import FormPreview from './FormPreview';
import { BUILTIN_FORM_FIELD } from '../../constants/events';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

export const DEFAULT_FORM_SCHEMA = {
  builtinFields: [
    { field: BUILTIN_FORM_FIELD.NAME, required: true },
    { field: BUILTIN_FORM_FIELD.EMAIL, required: true },
  ],
  customQuestions: [],
};

const createDefaultFormSchema = () => ({
  builtinFields: DEFAULT_FORM_SCHEMA.builtinFields.map(fieldConfig => ({ ...fieldConfig })),
  customQuestions: [],
});

const EventFormBuilder = ({
  title,
  identityKey = 'guestInfo',
  initialSchema,
  isConfigured = Boolean(initialSchema),
  isLoading,
  loadError,
  onSave,
  isSaving,
  setupLabel,
}) => {
  const [schema, setSchema] = useState(createDefaultFormSchema);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (initialSchema) {
      setSchema({
        builtinFields: initialSchema.builtinFields ?? DEFAULT_FORM_SCHEMA.builtinFields,
        customQuestions: initialSchema.customQuestions ?? [],
      });
      setBuilderOpen(false);
    } else if (!isConfigured) {
      setSchema(createDefaultFormSchema());
      setBuilderOpen(false);
    }
  }, [initialSchema, isConfigured]);

  const handleSave = async () => {
    if (!schema.builtinFields.length) {
      setSaveError('At least one identity field must be enabled.');
      return;
    }
    setSaveError(null);
    try {
      await onSave(schema);
      showSuccessToast(isConfigured ? 'Form saved' : 'Form created');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to save form';
      setSaveError(msg);
      showErrorToast(msg);
    }
  };

  const shouldShowBuilder = isConfigured || builderOpen;
  const ctaLabel = setupLabel || `Set up ${title.toLowerCase()}`;
  const saveLabel = isConfigured ? 'Save form' : 'Create form';

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading form…</p>;
  }

  if (loadError) {
    return <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{loadError}</div>;
  }

  if (!shouldShowBuilder) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-4">
          This form has not been set up yet. Start with the default name and email fields, then
          customize the questions before saving.
        </p>
        <button
          type="button"
          onClick={() => setBuilderOpen(true)}
          className="mt-4 px-4 py-2 text-sm bg-msq-purple-rich text-white rounded-md shadow-sm hover:bg-msq-purple-deep cursor-pointer"
        >
          {ctaLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <BuiltinFieldsEditor
            builtinFields={schema.builtinFields}
            onChange={builtinFields => setSchema(prev => ({ ...prev, builtinFields }))}
          />
          <CustomQuestionsEditor
            customQuestions={schema.customQuestions}
            onChange={customQuestions => setSchema(prev => ({ ...prev, customQuestions }))}
          />
        </div>
        <FormPreview formSchema={schema} identityKey={identityKey} />
      </div>

      {saveError && (
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{saveError}</div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple-deep disabled:opacity-50"
        >
          {isSaving ? 'Saving…' : saveLabel}
        </button>
      </div>
    </div>
  );
};

export default EventFormBuilder;
