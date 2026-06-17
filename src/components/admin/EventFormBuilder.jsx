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

const EventFormBuilder = ({
  title,
  description,
  identityKey = 'guestInfo',
  initialSchema,
  isLoading,
  loadError,
  onSave,
  isSaving,
}) => {
  const [schema, setSchema] = useState(DEFAULT_FORM_SCHEMA);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (initialSchema) {
      setSchema({
        builtinFields: initialSchema.builtinFields ?? DEFAULT_FORM_SCHEMA.builtinFields,
        customQuestions: initialSchema.customQuestions ?? [],
      });
    }
  }, [initialSchema]);

  const handleSave = async () => {
    if (!schema.builtinFields.length) {
      setSaveError('At least one identity field must be enabled.');
      return;
    }
    setSaveError(null);
    try {
      await onSave(schema);
      showSuccessToast('Form saved');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to save form';
      setSaveError(msg);
      showErrorToast(msg);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading form…</p>;
  }

  if (loadError) {
    return <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{loadError}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6 bg-white rounded-lg border border-gray-200 p-4">
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
          {isSaving ? 'Saving…' : 'Save form'}
        </button>
      </div>
    </div>
  );
};

export default EventFormBuilder;
